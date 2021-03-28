import Drawable from 'drawable/Drawable'
import Point from 'util/Point'
import { pointFromEvent, MouseEventsTypes } from 'util/MouseEventHelper';
import Bounds from 'util/Bounds'

enum editorStatus {
    none = "none",
    drawingStart = "drawingStart",
    drawingProgress = "drawingProgress"
}

class Bbox extends Drawable {
    public point1: Point | null = null;
    public point2: Point | null = null;

    protected status: editorStatus = editorStatus.drawingStart;

    constructor(canvas: HTMLCanvasElement) {
        super();

        canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
    }

    onMouseDown(event: MouseEvent) : void
    {
        console.log('[onMouseDown]', event)

        if(event.button === 2) {
            return ;
        }

        const point = pointFromEvent(event)

        if(this.status == editorStatus.drawingStart) {
            this.point1 = point
            this.status = editorStatus.drawingProgress
        }
    }

    onMouseMove(event: MouseEvent) : void
    {
        const point = pointFromEvent(event)

        if(this.status == editorStatus.drawingProgress) {
            this.point2 = point
        }

        if(this.status == editorStatus.none) {
            
        }
    }

    onMouseUp(event: MouseEvent): void {

        if(event.button === 2) {
            return ;
        }

        const point = pointFromEvent(event)

        if(this.status == editorStatus.drawingProgress) {
            this.point2 = point
            this.status = editorStatus.none

            this.emit('drawingStop')
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

    get bounds(): Bounds | null
    {
        if (this.point1 && this.point2) {
            return new Bounds(this.point1, this.point2)
        }

        return null
    }
}

export default Bbox