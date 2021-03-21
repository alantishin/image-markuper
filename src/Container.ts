import Bbox from 'drawable/Bbox'
import { pointFromEvent, MouseEventsTypes } from 'util/MouseEventHelper'

class Container
{
    protected canvas: HTMLCanvasElement
    protected ctx: CanvasRenderingContext2D
    protected items: Array<Bbox>;

    constructor(selector: string) {
        this.canvas = document.querySelector(selector) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
   
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

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

        

        window.requestAnimationFrame(this.draw.bind(this));
    }

    draw() {
        this.clear()

        for(const item of this.items) {
            item.draw()
        }

        window.requestAnimationFrame(this.draw.bind(this));
    }

    clear() {
        const width = this.canvas.width;
        const height = this.canvas.height;

        this.ctx.clearRect(0, 0, width, height);
    }
}

export default Container