import DrawableOptions from 'drawable/DrawableOptions'
import { MouseEventsTypes } from 'util/MouseEventHelper'
import Point from 'util/Point'

abstract class Drawable {
    protected options: DrawableOptions;

    constructor() {
        this.options = new DrawableOptions()
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract onMouseEvent(type: MouseEventsTypes, point: Point): void;
}

export default Drawable