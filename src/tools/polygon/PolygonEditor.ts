import _cloneDeep from 'lodash/cloneDeep'
import Tool from 'tools/Tool'
import Point from 'util/Point'
import { pointFromEvent } from 'util/MouseEventHelper';
import Bounds from 'util/Bounds'

interface PolygonParams {
    canvas: HTMLCanvasElement,
    points: Array<Point>
}


class PolygonEditor extends Tool {

    public points: Array<Point> = []

    protected canvas: HTMLCanvasElement;

    protected eventFuncs: Map<string, any>;

    constructor(params: PolygonParams) {
        super();

        this.canvas = params.canvas
        this.eventFuncs = new Map()
        this.points = params.points

        this.initEvents()
    }

    initEvents(): void
    {
        this.eventFuncs.set('click', this.onMouseClick.bind(this))
        this.eventFuncs.set('mousemove', this.onMouseMove.bind(this))
       
        setTimeout(() => {
            this.canvas.addEventListener('click', this.eventFuncs.get('click'))
            this.canvas.addEventListener('mousemove', this.eventFuncs.get('mousemove'))
        }, 100)
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

            // ctx.moveTo(firstPoint.x, firstPoint.y);
            
            ctx.closePath();

            ctx.fill();
            ctx.stroke();
        }
    }


    onMouseClick(event: MouseEvent) : void
    {

    }

    onMouseMove(event: MouseEvent): void
    {

    }

    hasHoverEditor(): boolean {
        return false
    }
}

export default PolygonEditor