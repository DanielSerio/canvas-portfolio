import { createElement } from '..'
import { Project, ProjectType } from '../Project'

export default class Application {
  public _activeProjectId: string|null = null
  public listEl!: HTMLUListElement
  constructor (
    public rootEl: HTMLElement,
    public contentEl: HTMLElement,
    public modalEl: HTMLElement,
    public projects: Project[]
  ) {
    this.listEl = createElement('ul', { className: 'project-list' }) as HTMLUListElement
    this.populateList()
    this.listEl.addEventListener('click', this.handleListClick)
    this.contentEl.appendChild(this.listEl)
  }

  private populateList = () => {
    this.projects.forEach((proj: Project) => this.listEl.appendChild(proj.thumbnailLi))
  }

  private handleListClick = (e: MouseEvent) => {
    const { dataset } = e.target as HTMLElement
    if (dataset && dataset.id) this._activeProjectId = dataset.id
    else this._activeProjectId = null
    this.toggleViewport()
    if (this._activeProjectId) {
      const project = this.projects.filter((p: Project) => p.id === this._activeProjectId)[0] as Project
      this.modalEl.innerHTML = ''
      this.modalEl.appendChild(project.getPresentationElement(() => {
        this._activeProjectId = null
        this.toggleViewport()
      }, () => {
        project.refresh()
      }))
    }
  }

  public toggleViewport (): void {
    if (this._activeProjectId) {
      if (this.modalEl.classList.contains('closed')) this.modalEl.classList.remove('closed')
      if (!this.rootEl.classList.contains('blurred')) this.rootEl.classList.add('blurred')
    } else {
      if (!this.modalEl.classList.contains('closed')) this.modalEl.classList.add('closed')
      if (this.rootEl.classList.contains('blurred')) this.rootEl.classList.remove('blurred')
    }
  }
}
