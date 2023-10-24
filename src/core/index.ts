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
import { dragOptions, DragOptions } from './options'


function createDrag(options: any) {
  if (this instanceof createDrag) {
    return createDrag(options)
  }

  if (isObject(options) && !isArray(options)) {
    warn('options is volid')
    return
  }

  const dragInstance = Object.create(dragOptions)
  init(options, dragInstance)
}