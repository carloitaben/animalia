import type { GetStaticProps, NextPage } from "next"
import Head from "next/head"

import { items, Item } from "~/data"
import { processItems } from "~/utils"

import Container from "~/components/Container"
import ListItem from "~/components/ListItem"
import Form from "~/components/Form"

type Props = {
  items: Required<Item>[]
}

export const getStaticProps: GetStaticProps<Props> = (context) => {
  const processedItems = processItems(items)

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
    <main className="min-h-screen flex flex-col">
      <Head>
        <title>Animalia</title>
        <meta
          name="description"
          content="Astronomically good pet name inspiration from yours truly, every now an then."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <h1 className="sr-only">Animalia</h1>
      <Container>
        {items.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </Container>
      <Form />
    </main>
  )
}

export default Page
