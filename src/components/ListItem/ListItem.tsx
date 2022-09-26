import { useRouter } from "next/router"
import { FC } from "react"
import { motion, Transition } from "framer-motion"

import { processItems } from "~/utils"

import NewIndicator from "./NewIndicator"
import Tag from "./Tag"

type Props = {
  item: ReturnType<typeof processItems>[number]
}

const transition: Transition = {
  type: "spring",
  duration: 1,
}

const ListItem: FC<Props> = ({ item }) => {
  const { asPath } = useRouter()

  const tags =
    asPath === "/" || asPath === "/new"
      ? item.tags
      : item.tags.filter((tag) => `/${tag.slug}` === asPath)

  return (
    <motion.article
      layoutId={item.name}
      transition={transition}
      className="pt-4 pb-8"
    >
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-6xl font-bold">{item.name}</h4>
        {item.new && <NewIndicator />}
      </div>
      <ul className="flex items-center gap-2 flex-wrap">
        {tags.map((tag) => (
          <li key={tag.slug}>
            <Tag tag={tag} />
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default ListItem
