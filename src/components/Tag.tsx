import type { FC } from "react"

import { Tag } from "~/data"

type Props = {
  tag: Tag
}

const Tag: FC<Props> = ({ tag }) => {
  return <div>{tag.name}</div>
}

export default Tag
