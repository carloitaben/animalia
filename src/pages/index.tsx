import type { GetStaticProps, NextPage } from "next"
import Head from "next/head"

import { items, Item } from "~/data"
import { processItems } from "~/utils"

import ListItem from "~/components/ListItem"

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
    <main>
      <Head>
        <title>Animalia</title>
        <meta
          name="description"
          content="Astronomically good pet name inspiration from yours truly, every now an then."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl sr-only">Animalia</h1>
      <section>
        {items.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </section>
    </main>
  )
}

export default Page
