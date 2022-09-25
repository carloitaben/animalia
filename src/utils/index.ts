import { allTags, Item, Tag } from "~/data"

export function sortTags(tags: Tag[]) {
  return tags.sort((a, b) => a.name.localeCompare(b.name))
}

export function processItems(items: Item[]): Required<Item>[] {
  return items.map((item) => {
    const tags = item.tags?.length ? item.tags : allTags
    const sortedTags = tags.sort((a, b) => a.name.localeCompare(b.name))

    return {
      ...item,
      tags: sortedTags,
    }
  })
}
