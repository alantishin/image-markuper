import Drawable from 'drawable/Drawable'
import { pointFromEvent, MouseEventsTypes } from 'util/MouseEventHelper'
import Bbox from 'drawable/Bbox';

class Repository {
    protected items: Array<Drawable> = []

    protected canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas

        this.initEditorEvents()
    }

    getItems(): Array<Drawable> {
        return this.items
    }

    initEditorEvents() {

        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
    }

    onMouseDown(event: MouseEvent): void {

        console.log('[onMouseDown]', event)

        if(event.button === 2) {
            return ;
        }
        
        this.items.push(new Bbox())

        const point = pointFromEvent(event)

        this.items[this.items.length - 1].onMouseEvent(MouseEventsTypes.mousedown, point)
    }

    onMouseMove(event: MouseEvent): void {
        const point = pointFromEvent(event)

        if (this.items[this.items.length - 1]) {
            this.items[this.items.length - 1].onMouseEvent(MouseEventsTypes.mousemove, point)
        }
    }

    onMouseUp(event: MouseEvent): void {

        if(event.button === 2) {
            return ;
        }

        const point = pointFromEvent(event)

        if (this.items[this.items.length - 1]) {
            this.items[this.items.length - 1].onMouseEvent(MouseEventsTypes.mouseup, point)
        }
    }
}

export default Repository
