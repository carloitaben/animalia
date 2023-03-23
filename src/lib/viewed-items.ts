const KEY = "animalia-viewed-items"

function getId(item: Element) {
  const id = item.getAttribute("id")
  if (!id) throw Error(`Missing id on item: ${item}`)
  return id
}

function save(items: string[]) {
  const payload = JSON.stringify(items)

  try {
    window.localStorage.setItem(KEY, payload)
  } catch (error) {
    if (import.meta.env.MODE === "development") console.error(error)
  }
}

function trackViewedItems() {
  if (!("localStorage" in window)) return
  if (!("IntersectionObserver" in window)) return

  const store = window.localStorage.getItem(KEY)
  const items = document.querySelectorAll("article")

  if (!store) {
    const ids = Array.from(items).map(getId)
    return save(ids)
  }

  const storeSet = new Set<string>(JSON.parse(store))
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      observer.unobserve(entry.target)
      const id = getId(entry.target)
      if (storeSet.has(id)) return

      const svg = entry.target.querySelector("svg")
      if (!svg) throw Error("Could not find svg element")
      svg.classList.remove("invisible")
      storeSet.add(id)
    })
  })

  items.forEach((item) => {
    const id = getId(item)
    if (!storeSet.has(id)) observer.observe(item)
  })

  window.addEventListener("beforeunload", () => {
    const ids = Array.from(storeSet.values())
    save(ids)
  })
}

trackViewedItems()
