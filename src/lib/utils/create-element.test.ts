import { createElement } from '.'

describe('createElement', () => {
  test('should create a div', () => {
    expect(createElement('div')).toBeInstanceOf(HTMLDivElement)
  })

  test('should add data', () => {
    const el = createElement('div', { data: { id: 'abc', name: 'xyz' } })
    expect(el).toBeInstanceOf(HTMLDivElement)
    expect(el.getAttribute('data-id')).toBe('abc')
    expect(el.getAttribute('data-name')).toBe('xyz')
  })

  test('should add an id', () => {
    expect(createElement('div', { id: 'ID' }).id).toBe('ID')
  })

  test('should add a single class', () => {
    expect(createElement('div', { className: 'class' }).classList).toContain('class')
  })

  test('should add multiple classes', () => {
    const list = createElement('div', { className: ['class', 'hidden'] }).classList
    expect(list).toContain('class')
    expect(list).toContain('hidden')
  })
})
