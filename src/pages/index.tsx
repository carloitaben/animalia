import type { NextPage } from "next"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Animalia</title>
        <meta
          name="description"
          content="Astronomically good pet name inspiration from yours truly, every now an then."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-4xl">Animalia</h1>
      </main>
    </>
  )
}

export default Home
