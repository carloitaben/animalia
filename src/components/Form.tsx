import { FC, ReactNode } from "react"

const Form: FC = () => {
  return (
    <footer className="sticky inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black px-8 pb-6 pt-16 pointer-events-none">
      <button className="bg-white rounded-full text-black text-center flex pointer-events-auto min-h-[4rem] items-center justify-center px-8 mx-auto">
        <span></span>
        <span>Subscribe to updates</span>
      </button>
    </footer>
  )
}

export default Form
