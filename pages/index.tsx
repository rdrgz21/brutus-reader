import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import kuromoji from 'kuromoji'
import Layout from '../components/Layout'

const Home: NextPage = () => {

  const [input, setInput] = useState('');
  const [tokenized, setTokenized] = useState(['']);

  const parseString = (string: string) => {
    kuromoji.builder({ dicPath: "/dict" }).build(function (err, tokenizer) {
      const tokenizedString = tokenizer.tokenize(string);
      const parsedSentence = tokenizedString.map(token => token.surface_form);
      setTokenized(parsedSentence);
    })
  }

  return (
    <Layout>
      <div style={{padding: '2em'}}>
        <Head>
          <title>Brutus Reader</title>
          <meta name="description" content="Read real Japanese with ease" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main >
          <h1>
            Welcome to Brutus Reader
          </h1>
          <label htmlFor='input'>Japanese Sentence</label>
          <br />
          <input onChange={e => setInput(prev => e.target.value)} style={{width: '100%'}} placeholder='Enter a Japanese sentence...' name='sentence' />
          <button onClick={() => parseString(input)}>Parse</button> 
          <hr />
          <h2>Parsed sentence:</h2>
          <p style={{ lineHeight: '3em' }}>
            {tokenized.map((token, index) => <span style={{border: '1px solid blue', borderRadius: '50px', marginRight: '1px', padding: '8px 16px', whiteSpace: 'nowrap'}} key={index}>{token}</span>)}
          </p>
        </main>
      </div>
    </Layout>
    
  )
}

export default Home
