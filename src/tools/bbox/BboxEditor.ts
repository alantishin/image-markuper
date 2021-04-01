import Tool from 'tools/Tool'
import Point from 'util/Point'
import { pointFromEvent } from 'util/MouseEventHelper';
import Bounds from 'util/Bounds'
import _cloneDeep from 'lodash/cloneDeep'

interface BboxParams {
    canvas: HTMLCanvasElement
}

const EDITOR_POINT_RADIUS = 10

class BboxEditor extends Tool {

    protected points: Array<Point>;

    protected canvas: HTMLCanvasElement;
    protected mouseHover: Boolean = false;

    protected vPointHover: Point | null = null;

    protected vPointDraggable: Point | null = null;
    protected vPointDraggableNeigbourX: Point | null = null;
    protected vPointDraggableNeigbourY: Point | null = null;

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

    initEvents(): void {
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this))

        this.canvas.addEventListener('click', this.onContextMenu.bind(this));
    }

    onContextMenu(event: MouseEvent) {
        console.log(event)
        event.preventDefault()
    }

    onMouseDown(event: MouseEvent): void {
        if (this.vPointHover) {
            this.vPointDraggable = this.vPointHover
            this.vPointDraggableNeigbourX = this.getPointNeigbour(this.vPointDraggable, 'x')
            this.vPointDraggableNeigbourY = this.getPointNeigbour(this.vPointDraggable, 'y')
        }
    }

    getPointNeigbour(point: any, prop: string): Point | null {
        return this.points.find(el => {
            return (
                el !== point &&
                el[prop as keyof Point] === point[prop as keyof Point]
            )
        }) || null
    }

    onMouseMove(event: MouseEvent): void {
        const point = pointFromEvent(event)

        this.mouseHover = this.intersectsPoint(point)
        this.vPointHover = this.editorPointHover(point)

        if (this.vPointDraggable && this.vPointDraggableNeigbourX && this.vPointDraggableNeigbourY) {
            this.vPointDraggable.x = point.x
            this.vPointDraggable.y = point.y

            this.vPointDraggableNeigbourX.x = point.x
            this.vPointDraggableNeigbourY.y = point.y
        }
    }

    onMouseUp(event: MouseEvent): void {
        const point = pointFromEvent(event)

        this.vPointDraggable = null;
        this.vPointDraggableNeigbourX = null;
        this.vPointDraggableNeigbourY = null;

        
    }

    intersectsPoint(point: Point): boolean {
        return (
            point.x > this.xMin &&
            point.x < this.xMax &&
            point.y > this.yMin &&
            point.y < this.yMax
        )
    }

    editorPointHover(mPoint: Point): Point | null {
        for (const vPoint of this.points) {
            const dist = vPoint.distancePoint(mPoint)

            if (dist < EDITOR_POINT_RADIUS) {
                return vPoint
            }
        }

        return null
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

    get topLeft(): Point {
        return new Point(this.xMin, this.yMin);
    }

    get bottomRight(): Point {
        return new Point(this.xMax, this.yMax);
    }


    get center(): Point {
        return new Point(
            this.xMin +  (this.width / 2),
            this.yMax - (this.height / 2),
        )
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        this.options.apply(ctx);
        ctx.rect(this.xMin, this.yMin, this.width, this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        if (this.mouseHover || this.vPointHover || this.vPointDraggable) {
            for (const vPoint of this.points) {
                this.drawEditPoint(ctx, vPoint)
            }

            this.drawDeletePoint(ctx)
        }
    }

    drawEditPoint(ctx: CanvasRenderingContext2D, point: Point): void {
        ctx.beginPath();
        this.options.apply(ctx);
        ctx.arc(point.x, point.y, EDITOR_POINT_RADIUS, 0, 2 * Math.PI);

        if (point === this.vPointHover) {
            ctx.fillStyle = 'red'
        }

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    drawDeletePoint(ctx: CanvasRenderingContext2D): void {
        const point = this.center;

        ctx.beginPath();
        this.options.apply(ctx);
        ctx.arc(point.x, point.y, EDITOR_POINT_RADIUS, 0, 2 * Math.PI);

        if (point === this.vPointHover) {
            ctx.fillStyle = 'red'
        }

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    hasHoverEditor(): boolean {
        return !!this.vPointHover
    }
}

export default BboxEditor
