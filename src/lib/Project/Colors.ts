export default class Colors {
  [key: string]: string
  public baseBlack: string = '#191c24'
  public grey25: string = '#3d4343'
  public grey50: string = '#827f7d'
  public grey75: string = '#bec1c1'
  public green: string = '#00b8b5'
  public baseWhite: string = '#f1efee'
  public purple: string = '#7467cb'

  public get random (): string {
    const colors: string[] = [
      this.green,
      this.purple
    ]

    return colors[Math.round(Math.random())]
  }
}
