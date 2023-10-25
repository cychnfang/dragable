import { DragOptions } from '../core/options'
import { isColorString, isNumber } from '../utils'

const DEFAULT_COLOR = '#F2F2F2'
const DEFAULT_GRIDE_WIDTH = 20
const DEFAULT_GRIDE_HEIGHT = 20
const DEFAULT_LINE_WIDTH = 0.5

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

interface Loction {
  x: number
  y: number
}

interface Line {
  start: Loction
  end: Loction
}

export const initGrid = (options: any, context: DragOptions) => {
  const { grid, gridConfigs } = options || {}
  if (grid === false) {
    context._configs.grid = false
    context._grid = null
    return
  }

  const $grid = document.createElement('canvas')
  const $cxt = $grid.getContext('2d') as CanvasRenderingContext2D

  const { gridWidth, gridHeight, lineWidth, lineColor } = gridConfigs || {}
  const finalGridWidth = isNumber(gridWidth) ? gridWidth : DEFAULT_GRIDE_WIDTH
  const finalGridHeight = isNumber(gridHeight)
    ? gridHeight
    : DEFAULT_GRIDE_HEIGHT
  const finalLineWidth = isNumber(lineWidth) ? lineWidth : DEFAULT_LINE_WIDTH
  const finalLineColor = isColorString(lineColor) ? lineColor : DEFAULT_COLOR

  const { width, height, left, top } = (context._canvas as Container).rect

  const gridInstance = {
    $el: $grid,
    $cxt,
    rect: {
      width,
      height,
      left,
      top
    },
    configs: {
      gridWidth: finalGridWidth,
      gridHeight: finalGridHeight,
      lineWidth: finalLineWidth,
      lineColor: finalLineColor
    }
  }

  context._grid = gridInstance
}

export const render = (grid: GridOptions) => {
  const { $cxt, rect, configs } = grid
  const { width, height } = grid.rect
  const { gridWidth, gridHeight } = grid.configs
  const { row, cell } = calcLinePoint()
  $cxt.beginPath()

  $cxt.closePath()
}

function calcGridPoint(): { row: number; cell: null } {}

function drawLine(grid: CanvasRenderingContext2D, line: Line) {
  cxt.moveTo(line.start)
  cxt.lineTo(line.start)
}
// container ｜ grid | component 都有一个render方法
// 影响视图的属性都用响应式数据，对于响应式数据执行顺序，先container => grid => component

// 响应式数据去重
