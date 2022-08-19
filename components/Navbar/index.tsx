import React, { FC } from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'

const Navbar: FC = () => {

  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <div style={{height: '50px', border: '2px solid violet', display: 'flex', justifyContent: 'space-around'}}>
      <Link href={'/'}>Home</Link>
      {user ? (
        <button onClick={() => {
          logout()
          router.push('/')
        }}>Logout</button>
      ) : 
      <>
       
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'}>Register</Link>
      </>
      }
    </div>
  )
}

export default Navbar