import { GridOptions, renderGrid } from '../grid'
import { isArray, isObject, isString, warn } from '../utils'
import { init } from './init'
import { dragOptions, DragOptions } from './options'
import { createComponent } from '../component'

export function createDrag(options: any) {
  if (this instanceof createDrag) {
    return createDrag(options)
  }

  if (!ensureOptions(options)) return

  const dragInstance = Object.create(dragOptions)
  init(options, dragInstance)
  render(dragInstance)

  // 添加
  const add = (options: any) => {
    const { _canvas, _components } = dragInstance
    const component = createComponent(options)

    if (!component) {
      warn('创建失败')
      return
    }

    _components.set(component.id, component)
    console.log(component.render())
    _canvas.$el.appendChild(component.$el)
  }

  return {
    add
  }
}

function ensureOptions(options: any): boolean {
  if (!isObject(options)) {
    warn('options is volid')
    return false
  }

  if (!isString(options.$el)) return false
  return Boolean(document.querySelector(options.$el))
}

function render(drag: DragOptions) {
  if (!drag.isMouted) {
    drag.isMouted = true
  }
  const _container = drag._container as Container
  const _canvas = drag._canvas as Container
  const _grid = drag._grid as Container

  renderGrid(drag._grid as GridOptions)
  _container.$el?.appendChild(_canvas.$el as Element)
  _container.$el?.appendChild(_grid.$el as Element)
}
