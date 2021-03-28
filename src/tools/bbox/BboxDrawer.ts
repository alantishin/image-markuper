import _cloneDeep from 'lodash/cloneDeep'
import Tool from 'tools/Tool'
import Point from 'util/Point'
import { pointFromEvent, MouseEventsTypes } from 'util/MouseEventHelper';
import Bounds from 'util/Bounds'

interface BboxParams {
    canvas: HTMLCanvasElement
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
    }

    initEvents(): void
    {
        this.eventFuncs.set('mousedown', this.onMouseDown.bind(this))
        this.eventFuncs.set('mousemove', this.onMouseMove.bind(this))
        this.eventFuncs.set('mouseup', this.onMouseUp.bind(this))

        this.canvas.addEventListener('mousedown', this.eventFuncs.get('mousedown'))
        this.canvas.addEventListener('mousemove', this.eventFuncs.get('mousemove'))
        this.canvas.addEventListener('mouseup', this.eventFuncs.get('mouseup'))
    }

    clearListeners(): void
    {
        this.canvas.removeEventListener('mousedown', this.eventFuncs.get('mousedown'))
        this.canvas.removeEventListener('mousemove', this.eventFuncs.get('mousemove'))
        this.canvas.removeEventListener('mouseup', this.eventFuncs.get('mouseup'))
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

    get x(): number | null {
        return this.point1 ? this.point1.x : null;
    }

    get y(): number | null {
        return this.point1 ? this.point1.y : null;
    }

    get width(): number | null {
        return this.point2 && this.x ? this.point2.x - this.x : null;
    }

    get height(): number | null {
        return this.point2 && this.y ? this.point2.y - this.y : null;
    }

    onMouseDown(event: MouseEvent) : void
    {
        if(event.button === 2) {
            return ;
        }

        const point = pointFromEvent(event)

        if(this.status == drawerStatus.drawingStart) {
            this.point1 = point
            this.status = drawerStatus.drawingProgress
        }
    }

    onMouseMove(event: MouseEvent) : void
    {
        const point = pointFromEvent(event)

        if(this.status == drawerStatus.drawingProgress) {
            this.point2 = point
        }
    }

    onMouseUp(event: MouseEvent): void {
        if(event.button === 2) {
            return ;
        }

        const point = pointFromEvent(event)

        if(this.status == drawerStatus.drawingProgress) {
            this.point2 = point
            this.status = drawerStatus.none

            this.clearListeners()

            this.emit('drawingStop', {
                bounds: _cloneDeep(this.bounds)
            })
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