import { createElement, randString } from '../utils'

export type Context = CanvasRenderingContext2D

export enum ProjectType {
  STATIC = 'static',
  ANIM = 'animated',
  EVENT = 'event-driven'
}

export interface ProjectReqParams {
  name: string
  desc: string
}

export interface ProjectOptionalParams {
  size?: number
}

export interface ProjectAttrs {
  id: string
  canvas: HTMLCanvasElement
  ctx: Context
  type: ProjectType
  thumbBackgroundURL: string
  thumbNameSpan: HTMLSpanElement
  descPara: HTMLParagraphElement
  nameHeading: HTMLHeadingElement
  thumbnailLi: HTMLLIElement
  getPresentationElement: (onClose: () => void, onRefresh?: () => void) => void

  render: () => void
}

export type ProjectOptions = ProjectReqParams & ProjectOptionalParams
export type ProjectParams = ProjectOptions & ProjectAttrs

export abstract class Project implements ProjectParams {
  public id: string = randString()
  public canvas: HTMLCanvasElement = createElement('canvas', { className: 'canvas', id: this.id }) as HTMLCanvasElement
  public ctx: Context = this.canvas.getContext('2d') as Context
  public type!: ProjectType
  public size: number = 300
  public name!: string
  public desc!: string
  public thumbNameSpan!: HTMLSpanElement
  public descPara!: HTMLParagraphElement
  public nameHeading!: HTMLHeadingElement

  constructor (options: ProjectOptions) {
    Object.assign(this, options)
    this.resize()
    this.thumbNameSpan = this.createThumbNameSpan()
    this.descPara = this.createDescPara()
    this.nameHeading = this.createNameHeading()
  }

  private createThumbNameSpan = (): HTMLSpanElement => {
    const span = createElement('span', { className: 'name', data: { id: this.id } })
    span.innerText = this.name

    return span as HTMLSpanElement
  }

  private createNameHeading = (): HTMLHeadingElement => {
    const title = createElement('h2', { className: 'title' })
    title.innerText = this.name
    return title as HTMLHeadingElement
  }

  private createDescPara = (): HTMLParagraphElement => {
    const p = createElement('p', { className: 'desc' }) as HTMLParagraphElement
    p.innerText = this.desc
    return p
  }

  private resize = () => {
    this.canvas.height = this.size
    this.canvas.width = this.size
  }

  public getPresentationElement (onClose: () => void, onRefresh?: () => void): HTMLDivElement {
    const container = createElement('div', { className: 'presentation' })
    const closeBtn = createElement('button', { className: 'close-btn' }) as HTMLButtonElement
    const refreshBtn = createElement('button', { className: 'refresh-btn' }) as HTMLButtonElement
    closeBtn.innerText = 'x'
    refreshBtn.innerText = 'Refresh'
    closeBtn.type = 'button'
    refreshBtn.type = 'button'
    closeBtn.addEventListener('click', onClose)
    if (onRefresh) refreshBtn.addEventListener('click', onRefresh)
    container.appendChild(closeBtn)
    container.appendChild(this.nameHeading)
    container.appendChild(this.canvas)
    container.appendChild(this.descPara)
    container.appendChild(refreshBtn)
    return container as HTMLDivElement
  }

  public get thumbnailLi (): HTMLLIElement {
    const li = createElement('li', { className: 'project-list-item', data: { id: this.id } }) as HTMLLIElement
    li.style.backgroundOrigin = 'center center'
    li.style.backgroundImage = this.thumbBackgroundURL
    li.style.backgroundSize = 'cover'
    li.appendChild(this.thumbNameSpan)
    return li
  }

  public render (): void {}

  public get thumbBackgroundURL (): string {
    this.render()
    return this.canvas.toDataURL()
  }
}
