import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'

export default function FirstPost(){
    return (
        <>
            <></>
            <Script 
                src="https://code.jquery.com/jquery-3.6.0.js" 
                strategy='lazyOnload'
                onLoad={()=>
                    console.log('test3')
                }
            />
        </>
    )
}