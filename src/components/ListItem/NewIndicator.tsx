/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"

const NewIndicator: FC = () => {
  const { asPath } = useRouter()

  const href = asPath === "/new" ? "/" : "/new"

  return (
    <div className="h-[3.75rem] flex items-center ml-4 shrink-0">
      <Link href={href}>
        <a>
          <img
            data-cosa={asPath}
            className="w-5 h-5"
            src="/favicon.svg"
            alt="New name!"
            title="New name!"
          />
        </a>
      </Link>
    </div>
  )
}

export default NewIndicator
