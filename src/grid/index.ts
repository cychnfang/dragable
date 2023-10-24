import { DragOptions } from '../core/options'

const DEFAULT_COLOR = '#F2F2F2'
const DEFAULT_GRIDE_WIDTH = 20
const DEFAULT_GRIDE_HEIGHT = 20
const DEFAULT_LINE_WIDTH = .5

export interface GridOptions {
  $el: HTMLCanvasElement
  $cxt: CanvasRenderingContext2D
  rect: Rect
  configs: {
    gridWidth: number
    gridHeight: number
    lineWidth: number
    lineColor: string
  }
}

export const createGrid = (options: any, context: DragOptions) => {
  const { grid, gridConfigs } = options || {}
  if (grid === false) {
    context._configs.grid = false
    context._grid = null
    return 
  }

  
  const $grid = document.createElement('canvas')
  const $cxt = $grid.getContext('2d')
  const gridInstance = {
    $el: $grid,
    $cxt,
    rect: {

    },
    configs: {
      gridWidth: DEFAULT_GRIDE_WIDTH,
      gridHeight: DEFAULT_GRIDE_HEIGHT,
      lineWidth: DEFAULT_LINE_WIDTH,
      lineColor: DEFAULT_COLOR,
    }
  }

  const { gridWidth, gridHeight, color } = gridConfigs || {}

  if()
}


// container ｜ grid | component 都有一个render方法
// 影响视图的属性都用响应式数据，对于响应式数据执行顺序，先container => grid => component

// 响应式数据去重
