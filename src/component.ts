import {
  isArray,
  isElement,
  isEmpty,
  isNumber,
  isObject,
  isString,
  warn
} from './utils'

let uid = 1

export interface Component {
  id: number
  $el: Element
  rect: Rect
  component: {
    $el: Element | null
    configs: { [key: string]: any } | null
  }

  update: (loc: Partial<Rect>, c: Component) => void
}
const DEFAUTL_WIDTH = 200
const DEFAUTL_HEIGHT = 200

type NumberProps = 'width' | 'height' | 'left' | 'top'
const numberProps: NumberProps[] = ['width', 'height', 'left', 'top']

const component: Component = {
  id: uid++,
  $el: document.createElement('div'),
  rect: {
    width: DEFAUTL_WIDTH,
    height: DEFAUTL_HEIGHT,
    left: 0,
    top: 0
  },
  component: {
    $el: null,
    configs: null
  },
  update: updateRect
}

// 1. create componet
export function createComponent(options: any): Component | null {
  const c = createComponentApi(options)
  if (c) c.update = updateRect
  return c
}

function createComponentApi(options: any): Component | null {
  const _component = Object.create(component)

  if (!checkOptions(options)) return _component

  // 处理string
  if (isString(options)) {
    _component.component.$el = options
    return _component
  }

  _component.component.configs = options.configs || null

  const $el = options.$el
  if (isElement($el)) {
    _component.component.$el = $el
  } else if (isString($el)) {
    const $component = document.querySelector($el)
    _component.component.$el = $component
  }

  // 更新rect
  updateRect(options, _component)

  return _component
}

function checkOptions(options: any): boolean {
  if (isEmpty(options)) return false
  if (isArray(options)) return false
  if (!isObject(options)) return false
  return true
}

function updateRect(rect: Partial<Rect>, component: Component) {
  numberProps.forEach(prop => {
    const propValue = parseFloat(prop)
    if (isNumber(propValue)) {
      component.rect[prop] = propValue
    }
  })
}
