import { GridOptions } from './../grid/index'
import { Component } from '../component'

export interface DragOptions {
  isMouted: boolean
  _configs: {
    helper: boolean
    grid: boolean
  }
  _container: Container | null
  _canvas: {
    $el: Element
    rect: Rect
  } | null
  _components: Map<string, Component>
  _grid: GridOptions | null
}

const DEFAULT_WIDTH = 1080
const DEFAULT_HEIGHT = 900

export const dragOptions: DragOptions = {
  isMouted: false,
  _configs: {
    helper: true,
    grid: true
  },
  // 容器
  _container: {
    $el: null,
    rect: {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      left: 0,
      top: 0
    }
  },
  // 画布
  _canvas: null,
  // 受控组件集合
  _components: new Map(),
  // 网格
  _grid: null
}
