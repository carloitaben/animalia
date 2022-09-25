import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"

import { items, allTags, Item, Tag } from "~/data"
import { processItems } from "~/utils"

import ListItem from "~/components/ListItem"

type Params = {
  slug: Tag["slug"]
}

type Props = {
  name: Tag["name"]
  items: Required<Item>[]
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = allTags.map((tag) => {
    return {
      params: {
        slug: tag.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
  if (!params) {
    throw Error("Invalid or missing param")
  }

  const paramTag = allTags.find((tag) => tag.slug === params.slug)

  if (!paramTag) {
    throw Error("Invalid param")
  }

  const processedItems = processItems(items)

  const filteredItems = processedItems.filter((item) =>
    item.tags.some((tag) => tag.slug === params.slug)
  )

  const sortedItems = filteredItems.sort((a, b) => a.name.localeCompare(b.name))

  return {
    props: {
      name: paramTag.name,
      items: sortedItems,
    },
  }
}

const Page: NextPage<Props> = ({ name, items }) => {
  return (
    <main>
      <Head>
        <title>Animalia - {name}</title>
      </Head>
      <h1 className="sr-only">{name}</h1>
      <section>
        {items.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </section>
    </main>
  )
}

export default Page
