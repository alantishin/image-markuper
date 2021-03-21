import Drawable from 'drawable/Drawable'
import { pointFromEvent, MouseEventsTypes } from 'util/MouseEventHelper'
import Bbox from './drawable/Bbox';

class Repository {
    protected items: Array<Drawable> = []

    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.ctx = ctx

        this.initEditorEvents()
    }

    getItems(): Array<Drawable> {
        return this.items
    }

    initEditorEvents() {

        this.items = [
            new Bbox(this.ctx)
        ]
    
        this.canvas.addEventListener('mousedown', (event) => {
            // console.log('mousedown', event)

            const point = pointFromEvent(event)

            this.items[0].onMouseEvent(MouseEventsTypes.mousedown, point)
        })

        this.canvas.addEventListener('mousemove', (event) => {
            const point = pointFromEvent(event)

            this.items[0].onMouseEvent(MouseEventsTypes.mousemove, point)
        })

        this.canvas.addEventListener('mouseup', (event) => {
            const point = pointFromEvent(event)
            this.items[0].onMouseEvent(MouseEventsTypes.mouseup, point)
        })
    }
}

export default Repository
