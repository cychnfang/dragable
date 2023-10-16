interface DragOptions {
  el?: string | HTMLDivElement
  gird?: boolean
  helpLine?: boolean
}

interface Drag {
  $mitt: any
}

export function createDrag(options: DragOptions): Drag {}
