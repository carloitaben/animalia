import type { GetStaticProps, NextPage } from "next"
import Head from "next/head"

import { items } from "~/data"
import { getExistingNames, processItems } from "~/utils"

import Main from "~/components/Main"
import Container from "~/components/Container"
import ListItem from "~/components/ListItem"
import Footer from "~/components/Footer"

type Props = {
  items: ReturnType<typeof processItems>
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const existingNames = await getExistingNames()
  const processedItems = processItems(items, existingNames)

  const sortedItems = processedItems.sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return {
    props: {
      items: sortedItems,
    },
  }
}

const Page: NextPage<Props> = ({ items }) => {
  return (
    <Main>
      <Head>
        <title>Animalia</title>
        <meta property="og:title" content="Animalia" />
      </Head>
      <h1 className="sr-only">Animalia</h1>
      <Container>
        {items.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </Container>
      <Footer />
    </Main>
  )
}

export default Page
