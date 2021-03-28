import Drawable from 'drawable/Drawable'
import Point from 'util/Point'
import { pointFromEvent, MouseEventsTypes } from 'util/MouseEventHelper';

interface BboxParams {
    canvas: HTMLCanvasElement
}

enum drawerStatus {
    none = "none",
    drawingStart = "drawingStart",
    drawingProgress = "drawingProgress"
}

class BboxDrawer extends Drawable {

    public point1: Point | null = null;
    public point2: Point | null = null;

    protected status: drawerStatus = drawerStatus.drawingStart;

    constructor(params: BboxParams) {
        super();

        const { canvas } = params

        canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
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
        console.log('[onMouseDown]', event)

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

            this.emit('drawingStop')
        }
    }
}

export default BboxDrawer