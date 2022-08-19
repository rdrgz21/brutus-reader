import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';

interface IProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({children}) => {
    const { user } = useAuth()
    const router= useRouter()

    useEffect(() => {
        if(!user) router.push('/login')
    }, [router, user])
    
  return (
    <>
        {user ? children : null}
    </>
  )
}

export default ProtectedRoute