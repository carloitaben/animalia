import { Client } from "@notionhq/client"
import { colors } from "tailwind.config"

const DATABASE_ID = "57dc8a63a9684fd89a368a6e3c7a08c6"

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" })

const notion = new Client({
  auth: import.meta.env.NOTION_INTEGRATION_TOKEN,
})

/**
 * Modified from here https://gist.github.com/codeguy/6684588?permalink_comment_id=4325476#gistcomment-4325476
 */
function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/\_/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/\-$/g, "")
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function isColor(color: string): asserts color is keyof typeof colors {
  if (!(color in colors)) throw Error(`Unsupported color: ${color}`)
}

function getColor(color: string) {
  isColor(color)
  return colors[color]
}

export async function getTags() {
  const database = await notion.databases.retrieve({
    database_id: DATABASE_ID,
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
      slug: slugify(option.name),
      color: getColor(option.color),
    }))
    .sort((a, b) => collator.compare(a.slug, b.slug))
}

export type Tag = Awaited<ReturnType<typeof getTags>>[number]

export type Item = {
  name: string
  slug: string
  tags: Tag[]
}

export async function getItems() {
  let data = await notion.databases.query({
    database_id: DATABASE_ID,
  })

  let results = [...data.results]

  while (data.has_more && data.next_cursor) {
    data = await notion.databases.query({
      database_id: DATABASE_ID,
      start_cursor: data.next_cursor,
    })

    results = [...results, ...data.results]
  }

  const tags = await getTags()
  const tagsMap = new Map<string, Tag>(tags.map((tag) => [tag.name, tag]))

  const processedResults = results.reduce((accumulator, result) => {
    if (!("properties" in result)) return accumulator
    if (!("Name" in result.properties)) return accumulator
    if (!("title" in result.properties.Name)) return accumulator
    if (!result.properties.Name.title.length) return accumulator

    const name = capitalize(
      result.properties.Name.title.map((title) => title.plain_text).join(" "),
    )

    const slug = slugify(name)

    if (accumulator.has(slug)) {
      console.warn(`Skipping duplicated item: ${name}`)
      return accumulator
    }

    let resultTags: Tag[] = []

    if (
      "multi_select" in result.properties.Kind! &&
      Array.isArray(result.properties.Kind.multi_select)
    ) {
      resultTags = result.properties.Kind.multi_select
        .reduce<typeof resultTags>((accumulator, value) => {
          const tag = tagsMap.get(value.name)
          if (tag) accumulator.push(tag)
          return accumulator
        }, [])
        .sort((a, b) => collator.compare(a.slug, b.slug))
    }

    return accumulator.set(slug, {
      name,
      slug,
      tags: resultTags,
    })
  }, new Map<string, Item>())

  return Array.from(processedResults.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  )
}

export async function getItemsByTagSlug(slug: string) {
  const items = await getItems()

  return items
    .filter((item) => item.tags.some((tag) => tag.slug === slug))
    .sort((a, b) => a.name.localeCompare(b.name))
}
