/* eslint-disable @next/next/no-img-element */

import { FC } from "react"

const NewIndicator: FC = () => {
  return (
    <div className="h-[3.75rem] flex items-center ml-4 shrink-0">
      <img
        className="w-5 h-5"
        src="/favicon.svg"
        alt="New name!"
        title="New name!"
      />
    </div>
  )
}

export default NewIndicator
