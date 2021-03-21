import _uniqueId from 'lodash/uniqueId'
import DrawableOptions from 'drawable/DrawableOptions'
import { MouseEventsTypes } from 'util/MouseEventHelper'
import Point from 'util/Point'

abstract class Drawable {
    protected options: DrawableOptions;
    protected _key: string;

    constructor() {
        this.options = new DrawableOptions()
        this._key = _uniqueId('drawable-')
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract onMouseEvent(type: MouseEventsTypes, point: Point): void;
}

export default Drawable