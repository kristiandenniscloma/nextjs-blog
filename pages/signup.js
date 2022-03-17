import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import Layout from "../components/layout"
import SignUpStyles from '../styles/SignUp.module.css'


export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const saveUser = async (e) => {
        e.preventDefault()

        setError('')
        setMessage('')

        if(!email || !password || !confirmPassword) return setError('All fields are required.')
        if(password != confirmPassword) return setError("Password and Confirm password didn't match")
    
        let user = {
            email,
            password,
            active: true,
            createdAt : new Date().toISOString()
        }

        let response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user)
        })

        let data = await response.json()

        if(data.success){
            setEmail('')
            setPassword('')
            setConfirmPassword('')

            return setMessage(data.message)
        }else{
            return setError(data.message)
        }
    }

    return (
        <Layout signup>
            <section id="main">
                {error ? (
                  <div class="alert alert-danger" role="alert">
                    {error}
                  </div>
                ): null}

                {message ? (
                <div class="alert alert-success" role="alert">
                    {message}
                </div>
                ) : null}
                <div class="container px-4">
                    <div class="row gx-4 justify-content-center">
                        <form className={SignUpStyles.signup_form} onSubmit={saveUser}>
                            <h4 class="mb-2">Sign Up</h4>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input onChange={(e)=>setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input onChange={(e)=>setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Confirm Password</label>
                                <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}