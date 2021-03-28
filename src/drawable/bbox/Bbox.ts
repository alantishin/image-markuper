import Drawable from 'drawable/Drawable'
import Point from 'util/Point'
import { pointFromEvent, MouseEventsTypes } from 'util/MouseEventHelper';
import Bounds from 'util/Bounds'
import BboxDrawer from 'drawable/bbox/BboxDrawer'

interface BboxParams {
    canvas: HTMLCanvasElement
}

class Bbox extends Drawable {
    protected drawer: BboxDrawer | null;

    constructor(params: BboxParams) {
        super();

        const { canvas } = params

        this.drawer = new BboxDrawer({
            canvas: canvas
        })

        this.drawer.once('drawingStop', this.onDrawingStop.bind(this))
    }

    onDrawingStop(event: any)
    {
        this.emit('drawingStop', event)
    }

    draw(ctx: CanvasRenderingContext2D): void 
    {
        if(this.drawer) {
            this.drawer.draw(ctx)
        }
    }

    // drawEditPoint(ctx: CanvasRenderingContext2D, point: Point): void
    // {
    //     ctx.beginPath();
    //     ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                
    //     ctx.fill();
    //     ctx.stroke();
    //     ctx.closePath();
    // }

    // get bounds(): Bounds | null
    // {
    //     if (this.point1 && this.point2) {
    //         return new Bounds(this.point1, this.point2)
    //     }

    //     return null
    // }
}

export default Bbox