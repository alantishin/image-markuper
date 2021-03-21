import DrawableOptions from 'drawable/DrawableOptions'
import { MouseEventsTypes } from 'util/MouseEventHelper'
import Point from 'util/Point'

abstract class Drawable {
    protected ctx: CanvasRenderingContext2D;
    protected options: DrawableOptions;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.options = new DrawableOptions()
    }

    abstract draw(): void;
    abstract onMouseEvent(type: MouseEventsTypes, point: Point): void;
}

export default Drawable