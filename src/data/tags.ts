export type Tag = {
  slug: string
  name: string
  color: `#${string}`
}

export const cat: Tag = {
  slug: "cat",
  name: "Cat",
  color: "#FE5B6F",
}

export const cockatiel: Tag = {
  slug: "cockatiel",
  name: "Cockatiel",
  color: "#B99DE4",
}

export const dog: Tag = {
  slug: "dog",
  name: "Dog",
  color: "#FEBD5B",
}

export const ferret: Tag = {
  slug: "ferret",
  name: "Ferret",
  color: "#98F06F",
}

export const tags = {
  cat,
  cockatiel,
  dog,
  ferret,
}

export const allTags = Object.values(tags)
