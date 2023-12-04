interface Rect {
  width: number
  height: number
  left: number
  top: number
}
interface Container {
  $el: HTMLDivElement
  rect: Rect
}
