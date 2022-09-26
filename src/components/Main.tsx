import { FC, ReactNode } from "react"

type ElementProps = JSX.IntrinsicElements["main"]

type Props = ElementProps & {
  children: ReactNode
}

const Main: FC<Props> = ({ children, className = "", ...props }) => {
  return (
    <main className={`min-h-screen flex flex-col pt-8 ${className}`} {...props}>
      {children}
    </main>
  )
}

export default Main
