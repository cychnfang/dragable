import { DragOptions } from '../core/options'
import { isColorString, isNumber } from '../utils'

const DEFAULT_LIGHT_COLOR = '#F2F2F2'
const DEFAULT_WEIGHT_COLOR = '#E3E3E3'
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
    lightColor: string
    weightColor: string
  }
}

interface Loction {
  x: number
  y: number
}

interface Line {
  start: Loction
  end: Loction
  lineColor: string
  lineWidth: number
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

  const { gridWidth, gridHeight, lineWidth, lightColor, weightColor } =
    gridConfigs || {}
  const finalGridWidth = isNumber(gridWidth) ? gridWidth : DEFAULT_GRIDE_WIDTH
  const finalGridHeight = isNumber(gridHeight)
    ? gridHeight
    : DEFAULT_GRIDE_HEIGHT
  const finalLineWidth = isNumber(lineWidth) ? lineWidth : DEFAULT_LINE_WIDTH
  const finalLightColor = isColorString(lightColor)
    ? lightColor
    : DEFAULT_LIGHT_COLOR
  const finalWeightColor = isColorString(weightColor)
    ? weightColor
    : DEFAULT_WEIGHT_COLOR

  const { width, height, left, top } = (context._container as Container).rect
  const { width: cW } = (context._canvas as Container).rect

  const gridInstance = {
    $el: $grid,
    $cxt,
    rect: {
      width,
      height,
      left: Math.floor((cW - width) / 2),
      top
    },
    configs: {
      gridWidth: finalGridWidth,
      gridHeight: finalGridHeight,
      lineWidth: finalLineWidth,
      lightColor: finalLightColor,
      weightColor: finalWeightColor
    }
  }

  context._grid = gridInstance
}

export const renderGrid = (grid: GridOptions) => {
  setCanvasStyle(grid)
  drawLine(grid, calcLinePoint(grid))
}

function calcLinePoint(grid: GridOptions): Line[] {
  const { rect, configs } = grid
  const { width, height } = rect
  const { gridWidth, gridHeight, lineWidth, lightColor, weightColor } = configs

  const cell = Math.ceil(width / gridWidth)
  const row = Math.ceil(height / gridHeight)

  let restX = (width % gridWidth) / 2
  let restY = (height % gridHeight) / 2

  const arr: Line[] = []
  // calc row lines
  ;[...Array(row)].forEach((_, index) => {
    const rowY = index * gridHeight + restY
    if (index > 0 && index < row) {
      arr.push({
        lineColor: index % 4 === 0 ? weightColor : lightColor,
        lineWidth,
        start: {
          x: restX + 0.5,
          y: rowY
        },
        end: {
          x: width - restX + 0.5,
          y: rowY
        }
      })
    }
  })
  ;[...Array(cell)].forEach((_, index) => {
    const cellX = index * gridWidth + restX
    if (index > 0 && index < cell) {
      arr.push({
        lineColor: index % 4 === 0 ? weightColor : lightColor,
        lineWidth,
        start: {
          x: cellX + 0.5,
          y: restY
        },
        end: {
          x: cellX + 0.5,
          y: height - restY
        }
      })
    }
  })
  return arr
}

function drawLine(grid: GridOptions, lines: Line[]) {
  const { $cxt } = grid
  lines.forEach(line => {
    $cxt.beginPath()
    const { start, end, lineColor } = line
    $cxt.moveTo(start.x, start.y)
    $cxt.lineTo(end.x, end.y)
    $cxt.strokeStyle = lineColor
    $cxt.stroke()
    $cxt.beginPath()
  })
}
// container ｜ grid | component 都有一个render方法
// 影响视图的属性都用响应式数据，对于响应式数据执行顺序，先container => grid => component

// 响应式数据去重

function setCanvasStyle(grid: GridOptions) {
  const { $el, rect } = grid
  const { width, height } = rect
  $el.width = width
  $el.height = height
}

function setLineStyle(grid: GridOptions, line: Line) {
  const { $cxt } = grid
  const { lineColor, lineWidth } = line
  $cxt.fillStyle = 'red'
  $cxt.lineWidth = lineWidth
}
