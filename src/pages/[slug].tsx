import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { CSSProperties } from "react"
import Head from "next/head"

import { items, allTags, Item, Tag } from "~/data"
import { processItems } from "~/utils"

import Container from "~/components/Container"
import ListItem from "~/components/ListItem"
import Form from "~/components/Form"

type Params = {
  slug: Tag["slug"]
}

type Props = {
  tag: Tag
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
      tag: paramTag,
      items: sortedItems,
    },
  }
}

const Page: NextPage<Props> = ({ tag, items }) => {
  const title = `Animalia - ${tag.name}`

  const style: CSSProperties = {
    color: tag.color,
  }

  return (
    <main className="min-h-screen" style={style}>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="sr-only">{title}</h1>
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
