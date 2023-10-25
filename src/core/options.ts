import { GridOptions } from './../grid/index'
import { Component } from '../component'

export interface DragOptions {
  _configs: {
    helper: boolean
    grid: boolean
  }
  _container: Container | null
  _wrap: {
    $el: Element | null
    rect: Rect
    configs: {
      backgroundColor: string
    }
  }
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
  _configs: {
    helper: true,
    grid: true
  },
  _container: {
    $el: null,
    rect: {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      left: 0,
      top: 0
    }
  },
  _wrap: {
    $el: null,
    rect: {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      left: 0,
      top: 0
    },
    configs: {
      backgroundColor: ''
    }
  },
  _canvas: null,
  _components: new Map(),
  _grid: null
}
