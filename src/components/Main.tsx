import { FC, ReactNode } from "react"

type ElementProps = JSX.IntrinsicElements["main"]

type Props = ElementProps & {
  children: ReactNode
}

const Main: FC<Props> = ({ children, className = "", ...props }) => {
  return (
    <main className={`pt-8 flex-1 ${className}`} {...props}>
      {children}
    </main>
  )
}

export default Main
