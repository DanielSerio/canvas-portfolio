import { Project } from '.'

export class TProject extends Project {}

describe('Project', () => {
  test('should have an id', () => {
    const t = new TProject({
      name: 'test',
      desc: 'test'
    })

    expect(t.id).toBeTruthy()
  })

  test('should have a canvas', () => {
    const t = new TProject({
      name: 'test',
      desc: 'test'
    })

    expect(t.canvas).toBeInstanceOf(HTMLCanvasElement)
  })

  test('should have a context', () => {
    const t = new TProject({
      name: 'test',
      desc: 'test'
    })

    expect(t.ctx).toBeInstanceOf(CanvasRenderingContext2D)
  })

  test('should resize the canvas', () => {
    const t = new TProject({
      name: 'test',
      desc: 'test',
      size: 400
    })

    expect(t.canvas.width).toBe(400)
    expect(t.canvas.height).toBe(400)
  })
})
