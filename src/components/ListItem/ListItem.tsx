/* eslint-disable @next/next/no-img-element */

import { FC } from "react"

import { processItems } from "~/utils"

import NewIndicator from "./NewIndicator"
import Tag from "./Tag"

type Props = {
  item: ReturnType<typeof processItems>[number]
}

const ListItem: FC<Props> = ({ item }) => {
  return (
    <article className="pt-4 pb-8">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-6xl font-bold">{item.name}</h4>
        {item.new && <NewIndicator />}
      </div>
      <ul className="flex items-center gap-2 flex-wrap">
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
