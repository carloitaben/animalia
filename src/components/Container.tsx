import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Container: FC<Props> = ({ children }) => {
  return (
    <section className="px-8 mx-auto max-w-3xl w-full divide-y divide-current">
      {children}
    </section>
  )
}

export default Container
