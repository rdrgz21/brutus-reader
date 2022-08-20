import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

const Home: NextPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [user, router])

  return (
    <Layout>
      <div style={{ padding: '2em' }}>
        <h1>WELCOME</h1>
      </div>
    </Layout>
  )
}

export default Home
