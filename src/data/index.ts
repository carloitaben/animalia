export const tags = ["Cat", "Dog", "Cockatiel", "Ferret"] as const

export type Tag = typeof tags[number]

export type Name = {
  name: string
  tags: Tag[]
}

export const items: Name[] = [
  {
    name: "Foo",
    tags: ["Cat", "Dog"],
  },
]
