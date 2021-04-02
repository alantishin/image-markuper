import _uniqueId from 'lodash/uniqueId'
import ToolOptions from 'tools/ToolOptions'
import Events from 'events'
import Bounds from 'util/Bounds'
import MarkupImage from 'image/MarkupImage'

abstract class Tool extends Events.EventEmitter {
    protected options: ToolOptions;
    protected _key: string;

    constructor() {
        super();

        this.options = new ToolOptions()
        this._key = _uniqueId('drawable-')
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    
    isFocused(): boolean {
        return false
    }

    checkMinArea(imageArea: number, minArea: number, bounds: Bounds) {
        return (bounds.area / imageArea ) * 100 >  minArea
    }
}

export default Tool