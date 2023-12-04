import * as CSS from 'csstype'
// is string
export const isString = (value: any): boolean => typeof value === 'string'

export const isNumber = (value: any): boolean => typeof value === 'number'

export const isBoolean = (value: any): boolean => typeof value === 'boolean'

export const isArray = (value: any): boolean => Array.isArray(value)

export const isObject = (value: any): boolean =>
  typeof value === 'object' && value !== null && !isArray(value)

export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}

export const isElement = (node: any): boolean => node instanceof Element

export const isColorString = (str: any): boolean =>
  /\^#[a-zA-Z0-9]{6}$/.test(str)

export const isEmpty = (value: any): boolean =>
  value === null || value === '' || value === undefined

export const warn = (msg: string) => console.warn(msg)

export const setStyles = (element: HTMLElement, styles: CSS.Properties) => {
  console.log(styles, '----')
  Object.keys(styles).forEach(styleKey => {
    element.style[styleKey as any] = styleKey[styleKey as any]
  })
}
