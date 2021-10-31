import { randString } from '.'

describe('randString', () => {
  test('should create a string of long length', () => {
    expect(randString(400).length).toBe(400)
  })

  test('should create a string of short length', () => {
    expect(randString(1).length).toBe(1)
  })

  test('should create an alphanumeric string', () => {
    expect(randString(255)).toMatch(/^[a-z0-9]+$/i)
  })
})
