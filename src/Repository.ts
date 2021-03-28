import Tool from 'tools/Tool';
import Bbox from 'tools/bbox/Bbox';
import Events from 'events'

class Repository extends Events.EventEmitter  {
    protected items: Array<Tool> = []

    protected canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement) {
        super()
        this.canvas = canvas

        this.startDrawing()
    }

    startDrawing(): void
    {
        const toolObject = new Bbox({
            canvas: this.canvas
        });

        toolObject.once('drawingStop', this.onDrawingStop.bind(this))

        this.items.push(toolObject)
    }

    onDrawingStop(event: any): void
    {
        console.log('[onDrawingStop]', event)

        // this.startDrawing()
    }

    getItems(): Array<Tool> 
    {
        return this.items
    }
}

export default Repository
