import axios from 'axios'
import { load } from 'cheerio'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await axios.get('https://brutus.jp/')
    const html = response.data

    const articles: any = []
    const $ = load(html)

    const cards = $(
      '.c-home-whats-new-carousel-desktop .c-home-whats-new-carousel-card'
    )

    cards.each((index, element) => {
      const url = $(element).attr('href')

      const paragraphs = $(element).find('p')

      const strings: string[] = []

      paragraphs.each((index, element) => {
        const text = $(element)
          .text()
          .replace(/\n/g, '')
          .trim()
          .replace(/\s{2,}/g, ' ')
        strings.push(text)
      })

      const cardData = {
        url,
        published: strings[0],
        title: strings[1],
      }

      articles.push(cardData)
    })

    res.status(200).send(articles)
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: 'There was an error' })
  }
}
