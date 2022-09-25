import { FC } from "react"

import { Item } from "~/data"

import Tag from "./Tag"

type Props = {
  item: Required<Item>
}

const ListItem: FC<Props> = ({ item }) => {
  return (
    <article className="pt-4 pb-8">
      <h4 className="text-6xl font-bold mb-4">{item.name}</h4>
      <ul className="flex items-center gap-2">
        {item.tags.map((tag) => (
          <li key={tag.slug}>
            <Tag tag={tag} />
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ListItem
