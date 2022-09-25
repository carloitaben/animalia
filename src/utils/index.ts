import { Window, HTMLElement } from "happy-dom"

import { allTags, Item } from "~/data"

export async function getExistingNames() {
  const window = new Window()
  const response = await fetch("https://animalia.carlo.works/")
  const data = await response.text()

  window.document.body.innerHTML = data

  const nodes = window.document.querySelectorAll("h4")
  const names = nodes.reduce<string[]>((accumulator, element) => {
    if (element instanceof HTMLElement) accumulator.push(element.innerText)
    return accumulator
  }, [])

  return names
}

type ProcessedItem = Required<Item> & {
  new: boolean
}

export function processItems(
  items: Item[],
  existingNames: string[]
): ProcessedItem[] {
  return items.map((item) => {
    const tags = item.tags?.length ? item.tags : allTags
    const sortedTags = tags.sort((a, b) => a.name.localeCompare(b.name))

    return {
      ...item,
      tags: sortedTags,
      new: !existingNames.includes(item.name),
    }
  })
}
