import Head from 'next/head'
import Image from 'next/image'
import LayoutStyles from '../styles/layout.module.css'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Layout({ children, home }){
    const user_name = 'Kristian Cloma'
    const site_name = 'PayFC'

    useEffect( () => {
        const body = document.querySelector("body");
        document.body.id = "page-top"

        return () => {
          body.classList.remove("page-top");
        }
    });

    return (
        <div className={LayoutStyles.container}>
            <Head>
                <link refl="icon" href="/favicon.ico" />
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <title>{site_name}</title>
                <script dangerouslySetInnerHTML={{ __html: `
                if (document.cookie && document.cookie.includes('authed')) {
                    window.location.href = "/dashboard"
                }
                ` }} />
            </Head>
            {/* Navigation */}
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <div class="container px-4">
                    <a class="navbar-brand" href="#page-top">
                        <Image
                            priority
                            src="/images/logo-square.jpg"
                            className={LayoutStyles.logo_image}
                            width={120}
                            height={54}
                        />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="/#about">About</a></li>
                            <li class="nav-item"><a class="nav-link" href="/#services">Services</a></li>
                            <li class="nav-item"><a class="nav-link" href="/#contact">Contact</a></li>
                            <li class="nav-item">
                                <Link href="/login">
                                    <a class="nav-link">Login/Sign Up</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
            {/* Footer */}
            <footer class="py-5 bg-dark">
                <div class="container px-4"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2021</p></div>
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"></script>
        </div>
    )
}

