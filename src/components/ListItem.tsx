import Link from "next/link"
import type { FC } from "react"

import { Item } from "~/data"

import Tag from "./Tag"

type Props = {
  item: Required<Item>
}

const ListItem: FC<Props> = ({ item }) => {
  return (
    <article>
      <h4>{item.name}</h4>
      <ul>
        {item.tags.map((tag) => (
          <li key={tag.slug}>
            <Link href={tag.slug}>
              <a>
                <Tag tag={tag} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ListItem
