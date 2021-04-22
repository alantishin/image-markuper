import _cloneDeep from 'lodash/cloneDeep'
import Tool from 'tools/Tool'
import Point from 'geom/Point'
import { pointFromEvent } from 'util/MouseEventHelper';
import Bounds from 'geom/Bounds'

interface BboxParams {
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

class BboxDrawer extends Tool {

    public point1: Point | null = null;
    public point2: Point | null = null;

    protected canvas: HTMLCanvasElement;

    protected status: drawerStatus = drawerStatus.drawingStart;
    protected eventFuncs: Map<string, any>;

    constructor(params: BboxParams) {
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

        setTimeout(() => {
            this.canvas.addEventListener('click', this.eventFuncs.get('click'))
            this.canvas.addEventListener('mousemove', this.eventFuncs.get('mousemove'))
        }, 100)
    }

    clearListeners(): void
    {
        this.canvas.removeEventListener('click', this.eventFuncs.get('click'))
        this.canvas.removeEventListener('mousemove', this.eventFuncs.get('mousemove'))
    }

    draw(ctx: CanvasRenderingContext2D): void 
    {
        if (this.point1 && this.point2) {

            const x = this.x as number;
            const y = this.y as number;
            const width = this.width as number;
            const height = this.height as number;

            ctx.beginPath();
            this.options.apply(ctx);
            ctx.rect(x, y, width, height);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }

    get x(): number | null 
    {
        return this.point1 ? this.point1.x : null;
    }

    get y(): number | null 
    {
        return this.point1 ? this.point1.y : null;
    }

    get width(): number | null 
    {
        return this.point2 && this.x ? this.point2.x - this.x : null;
    }

    get height(): number | null 
    {
        return this.point2 && this.y ? this.point2.y - this.y : null;
    }

    onMouseClick(event: MouseEvent) : void
    {
        if(event.button === 2) {
            return ;
        }

        const point = pointFromEvent(event)

        if(this.status == drawerStatus.drawingStart) {
            
            this.point1 = point
            this.status = drawerStatus.drawingProgress

            return ;
        }

        if(this.status == drawerStatus.drawingProgress) {
            this.point2 = point
            this.status = drawerStatus.none

            this.clearListeners()

            this.emit('drawingStop', {
                bounds: _cloneDeep(this.bounds)
            })

            return ;
        }
    }

    onMouseMove(event: MouseEvent) : void
    {
        const point = pointFromEvent(event)

        if(this.status == drawerStatus.drawingProgress) {
            this.point2 = point
        }
    }

    get bounds(): Bounds | null
    {
        if (this.point1 && this.point2) {
            return new Bounds(this.point1, this.point2)
        }

        return null
    }
}

export default BboxDrawer