import { Project, ProjectType } from '.'
import { createElement } from '..'

export abstract class AnimProject extends Project {
  private _isRunning: boolean = false
  private _handle: null|number = null
  public type: ProjectType = ProjectType.ANIM

  public override render (): void {}

  public onStart (): void {}
  public onStop (): void {}
  public onAnimate (): void {}
  public start (): void {
    this._isRunning = true
    this.onStart()
    this._handle = requestAnimationFrame(this.animate)
  }

  public animate = () => {
    this.clear()
    this.onAnimate()
    this.render()
    if (this._isRunning) requestAnimationFrame(this.animate)
  }

  public stop (): void {
    this._isRunning = false
    this.onStop()
    if (this._handle) cancelAnimationFrame(this._handle)
    this._handle = null
  }

  public getPresentationElement (onClose: () => void): HTMLDivElement {
    const container = createElement('div', { className: 'presentation' })
    const closeBtn = createElement('button', { className: 'close-btn' }) as HTMLButtonElement
    const startBtn = createElement('button', { className: 'start-btn' }) as HTMLButtonElement
    closeBtn.innerText = '✖'
    startBtn.innerText = 'start'
    closeBtn.type = 'button'
    startBtn.type = 'button'
    closeBtn.addEventListener('click', onClose)
    startBtn.addEventListener('click', (e: MouseEvent) => {
      if (this._isRunning) {
        this.stop()
        startBtn.innerText = 'Start'
      } else {
        this.start()
        startBtn.innerText = 'Stop'
      }
    })
    container.appendChild(closeBtn)
    container.appendChild(this.nameHeading)
    container.appendChild(this.canvas)
    container.appendChild(this.descPara)
    container.appendChild(startBtn)
    return container as HTMLDivElement
  }
}
