import {
  isArray,
  isBoolean,
  isElement,
  isEmpty,
  isNumber,
  isObject,
  isString,
  warn
} from '../utils'
import { init } from './init'
import { dragOptions } from './options'

export function createDrag(options: any) {
  if (this instanceof createDrag) {
    return createDrag(options)
  }

  if (!ensureOptions(options)) return

  const dragInstance = Object.create(dragOptions)
  init(options, dragInstance)
}

function ensureOptions(options: any): boolean {
  if (!(isObject(options) && !isArray(options))) {
    warn('options is volid')
    return false
  }

  if (!isString(options.$el)) return false
  return Boolean(document.querySelector(options.$el))
}
