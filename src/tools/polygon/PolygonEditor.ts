import _cloneDeep from 'lodash/cloneDeep'
import Tool from 'tools/Tool'
import Point from 'geom/Point'
import { pointFromEvent } from 'util/MouseEventHelper';
import Bounds from 'geom/Bounds'
import PointsContainsPoint from 'geom/PointsContainsPoint'

interface PolygonParams {
    canvas: HTMLCanvasElement,
    points: Array<Point>
}

const EDITOR_POINT_RADIUS = 10

class PolygonEditor extends Tool {

    public points: Array<Point> = []

    protected canvas: HTMLCanvasElement;
    protected eventFuncs: Map<string, any>;
    protected mouseHover: Boolean = false;

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

        if (this.mouseHover) {
            for (const vPoint of this.points) {
                this.drawEditPoint(ctx, vPoint)
            }
        }
    }

    drawEditPoint(ctx: CanvasRenderingContext2D, point: Point): void {
        ctx.beginPath();
        this.options.apply(ctx);
        ctx.arc(point.x, point.y, EDITOR_POINT_RADIUS, 0, 2 * Math.PI);


        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }


    onMouseClick(event: MouseEvent) : void
    {
        
    }

    onMouseMove(event: MouseEvent): void
    {
        const point = pointFromEvent(event)
        this.mouseHover = PointsContainsPoint(this.points, point)
    }

    hasHoverEditor(): boolean {
        return false
    }
}

export default PolygonEditor