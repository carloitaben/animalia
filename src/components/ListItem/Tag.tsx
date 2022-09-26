import Link from "next/link"
import { useRouter } from "next/router"
import type { CSSProperties, FC } from "react"

import { Tag } from "~/data"

type Props = {
  tag: Tag
}

const Tag: FC<Props> = ({ tag }) => {
  const { asPath } = useRouter()

  const href = asPath === "/" || asPath === "/new" ? tag.slug : "/"

  const style: CSSProperties = {
    background: tag.color,
  }

  return (
    <Link href={href}>
      <a>
        <span
          className="min-h-[2rem] px-3 flex items-center justify-center rounded-full text-black"
          style={style}
        >
          {tag.name}
        </span>
      </a>
    </Link>
  )
}

export default Tag
