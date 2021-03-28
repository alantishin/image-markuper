import _uniqueId from 'lodash/uniqueId'
import ToolOptions from 'tools/ToolOptions'
import { MouseEventsTypes } from 'util/MouseEventHelper'
import Point from 'util/Point'
import Events from 'events'


abstract class Tool extends Events.EventEmitter {
    protected options: ToolOptions;
    protected _key: string;

    constructor() {
        super();

        this.options = new ToolOptions()
        this._key = _uniqueId('drawable-')
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
}

export default Tool