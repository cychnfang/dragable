import { isNumber } from '../utils'
import { DragOptions } from './options'

const DEFAULT_WIDTH = 1080
const DEFAULT_HEIGHT = 900

export function init(options: any, dragInstance: DragOptions) {
  initContainer(options, dragInstance)
}

function initContainer(options: any, dragInstance: DragOptions) {
  const { $el, width, height } = options
  const $container = document.querySelector($el)
  const { x, y, height: cH, width: cW } = $container.getBoundingClientRect()

  const finalWidth = isNumber(width) ? width : cW
  const finalHeight = isNumber(height) ? height : cH

  dragInstance._container = {
    $el: $container,
    rect: {
      width: finalWidth,
      height: finalHeight,
      left: x,
      top: y
    }
  }
}
