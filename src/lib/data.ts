import { Client } from "@notionhq/client"

// ADD SLUG TO THE ITEMS PLS

const notion = new Client({
  auth: import.meta.env.NOTION_INTEGRATION_TOKEN,
})

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" })

const colors = {
  red: "#FE5B6F",
  purple: "#B99DE4",
  yellow: "#FEBD5B",
  green: "#98F06F",
  blue: "#8AEBD9",
} as const

type Colors = typeof colors

export type Tag = {
  name: string
  color: Colors[keyof Colors]
}

export type Item = {
  name: string
  tags: Tag[]
}

function isColor(color: string): color is keyof Colors {
  return color in colors
}

function getColor(color: string) {
  if (!isColor(color)) throw Error(`Unsupported color: ${color}`)
  return colors[color]
}

export async function getTags() {
  const database = await notion.databases.retrieve({
    database_id: "57dc8a63a9684fd89a368a6e3c7a08c6",
  })

  if (!("Kind" in database.properties)) {
    throw Error('Missing property "Kind" in Notion database.')
  }

  if (database.properties.Kind.type !== "multi_select") {
    throw Error('Invalid type of "Kind" property in Notion database.')
  }

  return database.properties.Kind.multi_select.options
    .map((option) => ({
      name: option.name,
      slug: option.name.toLocaleLowerCase(),
      color: getColor(option.color),
    }))
    .sort((a, b) => collator.compare(a.slug, b.slug))
}

export async function getItems() {
  let data = await notion.databases.query({
    database_id: "57dc8a63a9684fd89a368a6e3c7a08c6",
  })

  let results = [...data.results]

  while (data.has_more && data.next_cursor) {
    data = await notion.databases.query({
      database_id: "57dc8a63a9684fd89a368a6e3c7a08c6",
      start_cursor: data.next_cursor,
    })

    results = [...results, ...data.results]
  }

  const processedResults = results.reduce((accumulator, result) => {
    if (!("properties" in result)) return accumulator
    if (!("Name" in result.properties)) return accumulator
    if (!("title" in result.properties.Name)) return accumulator

    const name = result.properties.Name.title.map((title) => title.plain_text).join(" ")

    if (accumulator.has(name)) {
      console.warn(`Ojo hay duplicau ${name}`) // TODO esto hacerlo bonito, quizás un test
      return accumulator
    }

    if (!("multi_select" in result.properties.Kind)) {
      return accumulator.set(name, {
        name,
        tags: [],
      })
    }

    // TODO: sort this before sending them to client
    const tags = result.properties.Kind.multi_select.map((value) => {
      if (!(value.color in colors)) {
        throw Error(`Unsupported color: ${value.color}`)
      }

      return {
        name: value.name,
        color: colors[value.color as keyof Colors],
      }
    })

    return accumulator.set(name, {
      name,
      tags,
    })
  }, new Map<string, Item>())

  return Array.from(processedResults.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export async function getItemsByCategory(tag: string) {
  const items = await getItems()
  return items
    .filter((item) =>
      item.tags.some(({ name }) => {
        return tag === name.toLocaleLowerCase()
      })
    )
    .sort((a, b) => a.name.localeCompare(b.name))
}
