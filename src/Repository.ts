import Tool from 'tools/Tool';
import Bbox from 'tools/bbox/Bbox';
import Events from 'events';

class Repository extends Events.EventEmitter  {
    protected items: Array<Tool> = []

    protected canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement) {
        super()
        this.canvas = canvas

        this.canvas.addEventListener('mousedown', this.startDrawingHandler.bind(this))
    }

    hasHoverEditor(): boolean
    {
        const item = this.items.find(el => {
            return el.hasHoverEditor()
        })

        return !!item
    }

    startDrawingHandler(event: MouseEvent): void
    {

        if(this.hasHoverEditor()) {
            return ;
        }

        const toolObject = new Bbox({
            canvas: this.canvas,
            drawer: {
                event: event
            }
        });

        toolObject.once('drawingStop', this.onDrawingStop.bind(this))

        this.items.push(toolObject)
    }

    onDrawingStop(event: any): void
    {
        console.log('[onDrawingStop]', event)
    }

    getItems(): Array<Tool> 
    {
        return this.items
    }
}

export default Repository
