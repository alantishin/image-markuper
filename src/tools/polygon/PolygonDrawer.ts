import _cloneDeep from 'lodash/cloneDeep'
import Tool from 'tools/Tool'
import Point from 'util/Point'
import { pointFromEvent } from 'util/MouseEventHelper';
import Bounds from 'util/Bounds'

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

    public point1: Point | null = null;
    public point2: Point | null = null;

    protected canvas: HTMLCanvasElement;

    protected status: drawerStatus = drawerStatus.drawingStart;
    protected eventFuncs: Map<string, any>;

    constructor(params: PolygonParams) {
        super();

        this.canvas = params.canvas
        this.eventFuncs = new Map()

        this.initEvents()

        if(params.drawer?.event) {
            this.onMouseDown(params.drawer.event)
        }
    }

    initEvents(): void
    {
        this.eventFuncs.set('mousedown', this.onMouseDown.bind(this))
        this.eventFuncs.set('mousemove', this.onMouseMove.bind(this))
        this.eventFuncs.set('mouseup', this.onMouseUp.bind(this))

        // this.canvas.addEventListener('mousedown', this.eventFuncs.get('mousedown'))
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

    }


    onMouseDown(event: MouseEvent) : void
    {

    }

    onMouseMove(event: MouseEvent) : void
    {

    }

    onMouseUp(event: MouseEvent): void {

    }

    get bounds(): Bounds | null
    {


        return null
    }
}

export default PolygonDrawer