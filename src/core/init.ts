import { initGrid } from '../grid'
import { isColorString, isNumber } from '../utils'
import { DragOptions } from './options'

const DEFAULT_WIDTH = 1080
const DEFAULT_HEIGHT = 900

export function init(options: any, dragInstance: DragOptions) {
  initContainer(options, dragInstance)
  initCanvas(dragInstance)
  initGrid(options, dragInstance)
}

// 初始化容器
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

  const { backgroudColor } = options
  dragInstance._wrap = {
    $el: document.createElement('div'),
    configs: {
      backgroundColor: isColorString(backgroudColor)
        ? backgroudColor
        : '#AEA8A8'
    },
    rect: {
      width: width * 2,
      height: height * 2,
      left: 0,
      top: 0
    }
  }
}

// 初始化
function initCanvas(dragInstance: DragOptions) {
  const { width, height } = (dragInstance._wrap as Container).rect

  // 初始化2倍容器宽度
  dragInstance._canvas = {
    $el: document.createElement('div'),
    rect: {
      width: width - 200, // 外层容器长度-2测空出200
      height: height - 200,
      left: 100,
      top: 100
    }
  }
}
