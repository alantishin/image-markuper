import Drawable from 'drawable/Drawable'
import Point from 'util/Point'
import { MouseEventsTypes } from 'util/MouseEventHelper'


enum editStatus {
    none = "none",
    startDrawing = "startDrawing",
    drawing = "drawing"
  }

class Bbox extends Drawable
{
    public point1: Point | null = null;
    public point2: Point | null = null;

    protected status: editStatus = editStatus.startDrawing;

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    onMouseEvent(type: MouseEventsTypes, point: Point) {
        // console.log('[onMouseEvent]', type, point)

        if (type == MouseEventsTypes.mousedown && this.status == editStatus.startDrawing) {
            console.log('[onMouseEvent]', type, point)

            this.point1 = point

            this.status = editStatus.drawing
        }

        if (
            type == MouseEventsTypes.mousemove && 
            this.status == editStatus.drawing &&
            this.x && this.y
        ) {
            console.log('[onMouseEvent]', type, point)

            this.point2 = point

            // this.status = editStatus.none
        }

        if (
            type == MouseEventsTypes.mouseup && 
            this.status == editStatus.drawing &&
            this.x && this.y
        ) {
            console.log('[onMouseEvent]', type, point)

            this.point2 = point

            this.status = editStatus.none
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

    draw() {
        if (this.x && this.y && this.width && this.height) {
            this.options.apply(this.ctx)
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

export default Bbox