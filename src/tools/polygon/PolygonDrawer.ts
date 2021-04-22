import _cloneDeep from 'lodash/cloneDeep'
import Tool from 'tools/Tool'
import Point from 'geom/Point'
import { pointFromEvent } from 'util/MouseEventHelper';
import Bounds from 'geom/Bounds'

interface PolygonParams {
    canvas: HTMLCanvasElement,
    drawer?: {
        event: MouseEvent
    }
}

enum drawerStatus {
    none = "none",
    drawingStart = "drawingStart",
    drawingProgress = "drawingProgress"
}

class PolygonDrawer extends Tool {

    public points: Array<Point> = []
    public currentPoint: Point | null = null

    protected canvas: HTMLCanvasElement;

    protected status: drawerStatus = drawerStatus.drawingStart;
    protected eventFuncs: Map<string, any>;

    constructor(params: PolygonParams) {
        super();

        this.canvas = params.canvas
        this.eventFuncs = new Map()

        this.initEvents()

        if(params.drawer?.event) {
            this.onMouseClick(params.drawer.event)
        }
    }

    initEvents(): void
    {
        this.eventFuncs.set('click', this.onMouseClick.bind(this))
        this.eventFuncs.set('mousemove', this.onMouseMove.bind(this))
        this.eventFuncs.set('dblclick', this.onMouseDbClick.bind(this))

        setTimeout(() => {
            this.canvas.addEventListener('click', this.eventFuncs.get('click'))
            this.canvas.addEventListener('mousemove', this.eventFuncs.get('mousemove'))
            this.canvas.addEventListener('dblclick', this.eventFuncs.get('dblclick'))
        }, 100)
    }

    clearListeners(): void
    {
        this.canvas.removeEventListener('click', this.eventFuncs.get('click'))
        this.canvas.removeEventListener('mousemove', this.eventFuncs.get('mousemove'))
        this.canvas.removeEventListener('dblclick', this.eventFuncs.get('dblclick'))
    }

    draw(ctx: CanvasRenderingContext2D): void 
    {
        if (this.points.length > 0) {
            ctx.beginPath();

            const firstPoint = this.points[0]

            ctx.moveTo(firstPoint.x, firstPoint.y);

            this.options.apply(ctx);
            
            for(const point of this.points) {
                ctx.lineTo(point.x, point.y);
            }

            if(this.currentPoint) {
                ctx.lineTo(this.currentPoint.x, this.currentPoint.y);
            }

            // ctx.moveTo(firstPoint.x, firstPoint.y);
            
            ctx.closePath();

            ctx.fill();
            ctx.stroke();
        }
    }


    onMouseClick(event: MouseEvent) : void
    {
        const point = pointFromEvent(event)

        if(this.status == drawerStatus.drawingStart) {
            this.status = drawerStatus.drawingProgress
        }

        this.points.push(point)
    }

    onMouseMove(event: MouseEvent): void
    {
        const point = pointFromEvent(event)

        if(this.status == drawerStatus.drawingProgress) {
            this.currentPoint = point
        }
    }

    onMouseDbClick(event: MouseEvent): void
    {
        this.clearListeners()

        this.emit('drawingStop', {
            points: this.points
        })
    }

}

export default PolygonDrawer