import { FC } from "react"

const Form: FC = () => {
  return (
    <form
      action="/api/sendMail"
      method="post"
      className="pointer-events-auto flex flex-col px-6 pb-6"
    >
      <label htmlFor="email" className="sr-only text-black">
        Enter your email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        className="text-black placeholder:text-black/50 bg-gray rounded-full px-2 py-1 mb-3"
        required
      />
      <button
        type="submit"
        className="bg-black text-white text-center py-4 px-8 rounded-full"
      >
        Submit
      </button>
    </form>
  )
}

export default Form
