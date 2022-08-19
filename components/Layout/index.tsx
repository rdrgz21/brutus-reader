import React, { ReactNode, FC } from 'react'
import styles from '../../styles/Layout.module.css'
import Navbar from '../Navbar'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <>
      <Navbar />
        <div className={styles.container}>
          {children}
        </div>
    </> 
  )
}

export default Layout