import type { AppProps } from "next/app"
import Head from "next/head"

import "../styles/index.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="description"
          content="Astronomically good pet name inspiration from yours truly, every now an then."
        />
        <meta
          property="og:description"
          content="Astronomically good pet name inspiration from yours truly, every now an then."
        />
        <meta property="og:site_name" content="Animalia" />
        <meta property="og:url" content="https://animalia.carlo.works/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
