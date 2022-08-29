import axios from 'axios'
import { Cheerio, Element, load, text } from 'cheerio'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  allContent: any | null
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await axios.get(req.query.url as string)
    const html = response.data
    const $ = load(html)

    const extractText = (element: Cheerio<Element>) => {
      const text = $(element)
        .text()
        .replace(/\n/g, '')
        .trim()
        .replace(/\s{2,}/g, ' ')

      return text
    }

    const heading = extractText($('header .c-page-with-sidebar__content h1'))

    const subheading = extractText(
      $('header .c-page-with-sidebar__content h1 s-acf-wysiwyg')
    )

    const picture = $('aside figure .o-wrapper picture img').attr('src')

    const articleElements = $('article-content-ga-manager .s-article-content')

    const articleContent: any[] = []

    articleElements
      .children()
      .get()
      .forEach((e) => {
        const name = e.name
        const classes = $(e).attr()?.class
        const textElements = ['h1', 'h2', 'h3', 'p']

        // if menu (.lwptoc), promo item (.wp-block-brutus-promo), or spotify widget (.is-provider-spotify) return
        const returnClasses = [
          'lwptoc',
          'wp-block-brutus-promo',
          'is-provider-spotify',
        ]
        const returnClassFound = returnClasses.every((string) =>
          classes?.includes(string)
        )
        if (returnClassFound) return

        // if text element, extract html element type and text
        if (textElements.includes(name)) {
          articleContent.push({
            name,
            text: extractText($(e)),
          })
        }
        // if figure, find images and text
        if (name === 'figure') {
          const imageUrl = $(e).find('img').attr('src')
          const caption = extractText($(e).find('figcaption'))
          articleContent.push({
            name,
            imageUrl: imageUrl ? imageUrl : null,
            caption,
          })
        }

        // if slider (.wp-block-brutus-carousel), find <li> then find image <img> and caption <figcaption>
        if (classes?.includes('wp-block-brutus-carousel')) {
          const slides: any[] = []
          $(e)
            .find('figure')
            .each((_index, slide) => {
              const slideImage = $(slide).find('img').attr('src')
              const slideText = extractText($(slide))
              slides.push({
                name: 'figure',
                imageUrl: slideImage ? slideImage : null,
                caption: slideText,
              })
            })
          articleContent.push({
            name: 'slider',
            slides,
          })
        }

        // if aside, find text and image
        if (name === 'aside') {
          const asideImage = $(e).find('img').attr('src')
          const paragraphs = $(e).find('p')
          const asideText: string[] = []
          paragraphs.each((_index, p) => {
            asideText.push(extractText($(p)))
          })

          articleContent.push({
            name,
            imageUrl: asideImage ? asideImage : null,
            text: asideText,
          })
        }
      })

    const allContent = {
      heading,
      subheading,
      picture,
      articleContent,
    }

    res.status(200).send({ allContent, error: '' })
  } catch (error) {
    console.log(error)
    res.status(400).send({ allContent: null, error: 'There was an error' })
  }
}
