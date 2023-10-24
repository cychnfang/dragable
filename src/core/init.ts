import { DragOptions } from './options';

const DEFAULT_WIDTH = 1080
const DEFAULT_HEIGHT = 900

export function init(options: any, drag: DragOptions) {
    initContainer(options, drag)
}


function initContainer(options: any, dragInstance: DragOptions) {
    const { $el, width, height } = options
    const $container = document.querySelector($el)
    
    if ($container) {
        dragInstance._container = {
        $el: $container,
        rect: {
          width: isNumber(width) ? width : DEFAULT_WIDTH,
          height: isNumber(height) ? height : DEFAULT_HEIGHT,
          left: 0,
          top: 0
        }
      }
    }
  }
  