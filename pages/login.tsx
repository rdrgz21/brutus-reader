import { useRouter } from 'next/router';
import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext';

type LoginFormData = {
    email: string;
    password: string;
}

const Login: FC = () => {

    const { login } = useAuth()
    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormData>();

    const handleLogin: SubmitHandler<LoginFormData> = async (data, event) => {
        event?.preventDefault()

        try {
            await login(data.email, data.password)
            router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    console.log(watch("password"))

  return (
    <Layout>
        <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', width: '33%' }}>
            <h1>Login Page</h1>
            <hr />
            <form style={{display: 'flex', flexDirection:'column', width: '100%' }} onSubmit={handleSubmit(handleLogin)}>
                <label htmlFor='username'>Email address</label>
                <input type='text' placeholder='Enter your email address' {...register('email', { required: true })}></input>
                {errors.email && <p>This field is required</p>}
                <label htmlFor='username'>Password</label>
                <input type='password' placeholder='Enter your password' {...register('password', { required: true })}></input>
                {errors.password && <p>This field is required</p>}
                <button>Login</button>
            </form>
        </div>
    </Layout>
    
  )
}

export default Login