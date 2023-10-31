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

  const { width, height, left, top } = (context._container as Container).rect

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

export const renderGrid = (grid: GridOptions) => {
  setCanvasStyle(grid)
  drawLine(grid, calcLinePoint(grid))
}

function calcLinePoint(grid: GridOptions): Line[] {
  const { $cxt, rect, configs } = grid
  const { width, height } = rect
  const { gridWidth, gridHeight } = configs

  const row = Math.floor(width / gridWidth)
  const cell = Math.floor(height / gridHeight)

  let restX = (width % gridWidth) / 2
  let restY = (height % gridHeight) / 2

  const arr: Line[] = []
  // calc row lines
  ;[...Array(row - 1)].forEach((_, index) => {
    const x = index * gridWidth + restX
    const startY = index * gridHeight + restY
    arr.push({
      start: {
        x: restX,
        y: startY
      },
      end: {
        x: width + restX,
        y: startY
      }
    })
  })
  ;[...Array(cell - 1)].forEach((_, index) => {
    const x = index * gridWidth + restX
    const endX = index * gridWidth + restX
    arr.push({
      start: {
        x: endX,
        y: restY
      },
      end: {
        x: endX,
        y: height + restY
      }
    })
  })
  return arr
}

function drawLine(grid: GridOptions, lines: Line[]) {
  console.log(lines)
  const { $cxt } = grid
  lines.forEach(line => {
    $cxt.beginPath()
    const { start, end } = line
    $cxt.moveTo(start.x - 0.5, start.y - 0.5)
    $cxt.lineTo(end.x - 0.5, end.y - 0.5)
    $cxt.stroke()
    $cxt.beginPath()
  })
}
// container ｜ grid | component 都有一个render方法
// 影响视图的属性都用响应式数据，对于响应式数据执行顺序，先container => grid => component

// 响应式数据去重

function setCanvasStyle(grid: GridOptions) {
  const { $el, $cxt, rect, configs } = grid
  const { width, height } = rect
  console.log(width, height)
  $el.width = width
  $el.height = height

  const { lineColor, lineWidth } = configs
  $cxt.fillStyle = lineColor
  $cxt.lineWidth = lineWidth
}
