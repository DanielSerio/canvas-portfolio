interface CreateElementOptions {
  className?: string|string[]
  id?: string
  data?: { [key: string]: string }
}

export function createElement (tag: keyof HTMLElementTagNameMap, options?: CreateElementOptions) {
  const el = document.createElement(tag)
  if (options) {
    const { className, id, data } = options
    if (data) Object.assign(el.dataset, data)
    if (id) el.id = id
    if (className) {
      if (typeof className === 'string') el.classList.add(className)
      else el.classList.add(...className)
    }
  }

  return el
}
