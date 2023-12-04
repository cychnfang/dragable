import { initGrid, renderGrid } from '../grid'
import { isColorString, isNumber, setStyles } from '../utils'
import { DragOptions } from './options'

const DEFAULT_WIDTH = 1080
const DEFAULT_HEIGHT = 900

export function init(options: any, dragInstance: DragOptions) {
  initContainer(options, dragInstance)
  initCanvas(dragInstance)
  initGrid(options, dragInstance)
}

// 初始化
function initCanvas(dragInstance: DragOptions) {
  const { width, height } = (dragInstance._container as Container).rect

  const _canvas = {
    $el: document.createElement('div'),
    rect: {
      width: width * 1.5, // 外层容器长度-2测空出200
      height: height * 1.5,
      left: 0,
      top: 0
    }
  }
  const render = () => {
    _canvas.$el.classList.add('component')
    const { width, height, left, top } = _canvas.rect
    setStyles(_canvas.$el, {
      backgroundColor: 'AEA8A8',
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`
    })
  }

  const proxy = new Proxy(_canvas.rect, {
    get(target, p: keyof Rect) {
      return target[p]
    },
    set(target, p: keyof Rect, newValue, receiver) {
      target[p] = newValue
      render()
      return receiver
    }
  })

  render()

  // 初始化2倍容器宽度
  dragInstance._canvas = _canvas
}

// 初始化事件
function initEvent(dragInstance: DragOptions) {
  const { $el } = dragInstance._container as Container
  $el?.addEventListener('mousedown', handleMouseDown)
}

//
function handleMouseDown() {}
