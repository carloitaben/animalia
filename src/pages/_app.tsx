import type { AppProps } from "next/app"
import Head from "next/head"

import "../styles/index.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Astronomically good pet name inspiration from yours truly, every now an then."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
