import { isNumber, setStyles } from '../utils'
import { DragOptions } from './options'

// 初始化容器
export function initContainer(options: any, dragInstance: DragOptions) {
  const { $el, width, height } = options
  const $container = document.querySelector($el)
  $container.innerHTML = ''
  const { x, y, height: cH, width: cW } = $container.getBoundingClientRect()

  const finalWidth = isNumber(width) ? width : cW
  const finalHeight = isNumber(height) ? height : cH

  const rect = {
    width: finalWidth,
    height: finalHeight,
    left: x,
    top: y
  }
  const _container = {
    $el: $container
  }
  const proxy = new Proxy(_container.rect, {
    get(target, p: keyof Rect) {
      return target[p]
    },
    set(target, p: keyof Rect, newValue, receiver) {
      target[p] = newValue
      render(_container)
      return receiver
    }
  })

  dragInstance._container = _container
}

function render(container: Container) {
  const { $el, rect } = container
  setStyles($el, {
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    left: `${rect.left}px`,
    top: `${rect.top}px`
  })
}
