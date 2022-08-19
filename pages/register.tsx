import React, { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext';

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {

    const { signup } = useAuth()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>()

    const handleRegister: SubmitHandler<RegisterFormData> = async (data, event) => {
        event?.preventDefault()

        try {
            await signup(data.email, data.password)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(watch('confirmPassword'))

  return (
    <Layout>
        <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', width: '33%' }}>
            <h1>Register Page</h1>
            <hr />
            <form style={{display: 'flex', flexDirection:'column', width: '100%' }} onSubmit={handleSubmit(handleRegister)}>
                <label>Email address</label>
                <input type='text' placeholder='Enter your email address' {...register('email', { required: true })}></input>
                {errors.email && <p>This field is required</p>}
                <label>Password</label>
                <input type='password' placeholder='Enter your password' {...register('password', { required: true })}></input>
                {errors.password && <p>This field is required</p>}
                <label>Confirm Password</label>
                <input type='password' placeholder='Confirm your password' {...register('confirmPassword', { required: true })}></input>
                {errors.confirmPassword && <p>This field is required</p>}
                <button>Register</button>
            </form>
        </div>
    </Layout>
    
  )
}

export default Register
