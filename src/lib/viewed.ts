import { persistentAtom } from "@nanostores/persistent"

const $viewed = persistentAtom<string[]>("viewed", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export function hasBeenViewed(id: string) {
  return $viewed.get().includes(id)
}

export function setViewed(id: string) {
  $viewed.set([...$viewed.get(), id])
}
