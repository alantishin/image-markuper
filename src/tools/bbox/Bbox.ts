import Tool from 'tools/Tool'
import Point from 'util/Point'
import { pointFromEvent, MouseEventsTypes } from 'util/MouseEventHelper';
import Bounds from 'util/Bounds'
import BboxDrawer from 'tools/bbox/BboxDrawer'
import BboxEditor from 'tools/bbox/BboxEditor'

interface BboxParams {
    canvas: HTMLCanvasElement
}

class Bbox extends Tool {
    protected drawer: BboxDrawer | null;
    protected editor: BboxEditor | null;
    protected canvas: HTMLCanvasElement;

    constructor(params: BboxParams) {
        super();

        this.canvas = params.canvas;
        this.drawer = null;
        this.editor = null;

        this.initDrawer();
        
    }

    initDrawer(): void
    {
        this.drawer = new BboxDrawer({
            canvas: this.canvas
        })

        this.drawer.once('drawingStop', this.onDrawingStop.bind(this))
    }

    initEditor(bounds: Bounds): void
    {
        this.editor = new BboxEditor(bounds)
    }

    onDrawingStop(event: any)
    {
        console.log('[onDrawingStop]', event)

        this.emit('drawingStop', event)
        this.drawer = null;

        this.initEditor(event.bounds);
    }

    draw(ctx: CanvasRenderingContext2D): void 
    {
        if(this.drawer) {
            this.drawer.draw(ctx)
        }

        if (this.editor) {
            this.editor.draw(ctx)
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