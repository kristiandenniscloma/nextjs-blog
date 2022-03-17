import { Magic } from "magic-sdk";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/layout";

export default function Login() {    
    const router = useRouter()
    const handleSubmit = async(event) => {
        event.preventDefault()

        const  { elements } = event.target
        
        const did = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
        .auth
        .loginWithMagicLink({ email: elements.email.value })

        const authRequest = await fetch('/api/login', {
            method: 'POST',
            headers: { Authorization: `Bearer ${did}` }
        })

        if(authRequest.ok){
            router.push('/dashboard')
        }else{

        }
    }

    return (
        <Layout home>
            <section id="main">
                <h4>Log in/Sign Up</h4>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input name="email" type="email" />
                    <button>Log in</button>
                </form>
            </section>
        </Layout>
    )
}