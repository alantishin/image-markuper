import Tool from 'tools/Tool'
import Point from 'util/Point'
import { pointFromEvent, MouseEventsTypes } from 'util/MouseEventHelper';
import Bounds from 'util/Bounds'
import _cloneDeep from 'lodash/cloneDeep'

interface BboxParams {
    canvas: HTMLCanvasElement
}

enum editorStatus {
    none = "none",
    drawingStart = "drawingStart",
    drawingProgress = "drawingProgress"
}

class BboxEditor extends Tool {

    protected points: Array<Point>;
    protected canvas: HTMLCanvasElement;
    protected mouseHover: Boolean = false;

    constructor(canvas: HTMLCanvasElement, bounds: Bounds) {
        super();

        this.canvas = canvas

        this.points = [
            _cloneDeep(bounds.topLeft),
            _cloneDeep(bounds.topRight),
            _cloneDeep(bounds.bottomLeft),
            _cloneDeep(bounds.bottomRight),
        ]

        this.initEvents()
    }

    initEvents(): void
    {
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
    }

    onMouseDown(event: MouseEvent) : void
    {

    }

    onMouseMove(event: MouseEvent) : void
    {
        const point = pointFromEvent(event)

        this.mouseHover = this.intersectsPoint(point)
    }

    onMouseUp(event: MouseEvent): void {
        
    }

    intersectsPoint(point: Point): boolean
    {
        return (
            point.x > this.xMin &&
            point.x < this.xMax &&
            point.y > this.yMin &&
            point.y < this.yMax
        )
    }

    get xMin(): number {
        const x = this.points.map(el => el.x)

        return Math.min(...x)
    }

    get yMin(): number {
        const y = this.points.map(el => el.y)

        return Math.min(...y)
    }

    get xMax(): number {
        const x = this.points.map(el => el.x)

        return Math.max(...x)
    }

    get yMax(): number {
        const y = this.points.map(el => el.y)

        return Math.max(...y)
    }

    get width(): number {
        return this.xMax - this.xMin;
    }

    get height(): number {
        return this.yMax - this.yMin
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        this.options.apply(ctx);
        ctx.rect(this.xMin, this.yMin, this.width, this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        if(this.mouseHover) {
            for(const vPoint of this.points) {
                this.drawEditPoint(ctx, vPoint)
            }
        }
    }

    drawEditPoint(ctx: CanvasRenderingContext2D, point: Point): void
    {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

export default BboxEditor
