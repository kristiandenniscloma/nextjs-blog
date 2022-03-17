import { MoralisProvider } from 'react-moralis'
import '../styles/default.css'
import '../styles/global.css'

export default function App({ Component, pageProps }) {
    return (
        <MoralisProvider appId="1lyfugzwHOcTHfHWQxtAx2tf7o5hPMdr3dNrsFn5" serverUrl="https://oohi8jtdimvp.bigmoralis.com:2053/server">
            {
                <Component {...pageProps} />
            }
        </MoralisProvider>
    )
}


