import _uniqueId from 'lodash/uniqueId'
import DrawableOptions from 'drawable/DrawableOptions'
import { MouseEventsTypes } from 'util/MouseEventHelper'
import Point from 'util/Point'

export interface DrawOptions {
    ctx: CanvasRenderingContext2D
}

abstract class Drawable {
    protected options: DrawableOptions;
    protected _key: string;

    constructor() {
        this.options = new DrawableOptions()
        this._key = _uniqueId('drawable-')
    }

    abstract draw(options: DrawOptions): void;
    abstract onMouseEvent(type: MouseEventsTypes, point: Point): void;
}

export default Drawable