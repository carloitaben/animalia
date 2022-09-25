import { tags, Tag } from "./tags"

export type Item = {
  name: string
  tags?: Tag[]
}

export const items: Item[] = [
  {
    name: "Cumbia",
    tags: [tags.cockatiel],
  },
  {
    name: "Vitanima",
  },
  {
    name: "Espía",
  },
  {
    name: "Averniz",
    tags: [tags.cockatiel],
  },
  {
    name: "Cerviche",
    tags: [tags.cat],
  },
  {
    name: "Lobo Estepario",
    tags: [tags.dog],
  },
  {
    name: "Eslider",
    tags: [tags.ferret, tags.cat],
  },
]
