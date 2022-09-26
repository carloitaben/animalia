import "../styles/index.css"

import type { AppProps } from "next/app"
import Head from "next/head"

import Footer from "~/components/Footer"

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
      <div className="min-h-screen flex flex-col">
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  )
}

export default MyApp
