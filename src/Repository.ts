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
    
        this.canvas.addEventListener('mousedown', (event) => {
            // console.log('mousedown', event)

            this.items.push(new Bbox(this.ctx))

            const point = pointFromEvent(event)

            this.items[this.items.length - 1].onMouseEvent(MouseEventsTypes.mousedown, point)
        })

        this.canvas.addEventListener('mousemove', (event) => {
            const point = pointFromEvent(event)

            if(this.items[this.items.length - 1]) {
                this.items[this.items.length - 1].onMouseEvent(MouseEventsTypes.mousemove, point)
            }
        })

        this.canvas.addEventListener('mouseup', (event) => {
            const point = pointFromEvent(event)
            
            if(this.items[this.items.length - 1]) {
                this.items[this.items.length - 1].onMouseEvent(MouseEventsTypes.mouseup, point)
            }
        })
    }
}

export default Repository
