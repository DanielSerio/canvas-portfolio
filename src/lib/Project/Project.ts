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

  constructor (options: ProjectOptions) {
    Object.assign(this, options)
  }

  public render (): void {}
}
