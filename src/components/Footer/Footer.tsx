import { FC, useReducer } from "react"
import { AnimatePresence, motion, Variants } from "framer-motion"

import Form from "./Form"

const variants: Record<string, Variants> = {
  icon: {
    hide: {
      rotate: -45,
    },
    show: {
      rotate: 0,
    },
  },
  form: {
    hide: {
      height: 0,
      opacity: 0,
      overflow: "hidden",
    },
    show: {
      height: "auto",
      opacity: 1,
      transitionEnd: {
        overflow: "unset",
      },
    },
  },
}

const Footer: FC = () => {
  const [opened, toggle] = useReducer((current) => !current, true)

  return (
    <footer className="sticky inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black px-8 pb-8 pt-16 pointer-events-none flex items-center justify-center">
      <div className="rounded-[2rem] bg-white relative text-black pointer-events-auto w-full max-w-sm overflow-hidden">
        <button
          className="flex items-center justify-between w-full px-6 py-5 rounded-full"
          type="button"
          onClick={toggle}
        >
          <h6 className="mr-3">Subscribe to updates</h6>
          <motion.svg
            initial={false}
            animate={opened ? "show" : "hide"}
            variants={variants.icon}
            className="shrink-0"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
              fill="currentColor"
            />
          </motion.svg>
        </button>
        <AnimatePresence initial={false}>
          {opened && (
            <motion.div
              initial="hide"
              animate="show"
              exit="hide"
              variants={variants.form}
            >
              <Form />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}

export default Footer
