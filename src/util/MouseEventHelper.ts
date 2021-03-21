import Point from 'util/Point'

export const pointFromEvent = function(event: MouseEvent) {
    return new Point(event.offsetX, event.offsetY)
}

export enum MouseEventsTypes {
    mousedown = "mousedown",
    mousemove = "mousemove",
    mouseup = "mouseup",
    click = "click"
}