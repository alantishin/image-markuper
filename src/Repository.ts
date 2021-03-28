import Drawable from 'drawable/Drawable';
import Bbox from 'drawable/Bbox';
import Events from 'events'

class Repository extends Events.EventEmitter  {
    protected items: Array<Drawable> = []

    protected canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement) {
        super()
        this.canvas = canvas

        this.startDrawing()
    }

    startDrawing(): void
    {
        const drawable = new Bbox(this.canvas);

        drawable.once('drawingStop', this.onDrawingStop.bind(this))

        this.items.push(drawable)
    }

    onDrawingStop(event: any): void
    {
        console.log('[onDrawingStop]', event)

        this.startDrawing()
    }

    getItems(): Array<Drawable> 
    {
        return this.items
    }
}

export default Repository
