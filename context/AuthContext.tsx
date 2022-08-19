import {createContext, ReactNode, useContext, useEffect, useState, FC} from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

interface AuthContextProps {
    children: ReactNode
}

interface IUser {
    uid: string;
    email: string | null;
    displayName: string | null;
}

export const AuthContext = createContext<any>({uid: '',email:'' ,displayName:''})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider: FC<AuthContextProps> = ({children}) => {

    const [user, setUser] = useState<IUser | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // unsubscribe
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                })
            } else {
                setUser(null)
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }


    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {isLoading ? null : children}
        </AuthContext.Provider>
    )
}
