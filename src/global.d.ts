interface Rect {
  width: number
  height: number
  left: number
  top: number
}
interface Container {
  $el: Element | null
  rect: Rect
}
