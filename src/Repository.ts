import Tool from 'tools/Tool';
import Bbox from 'tools/bbox/Bbox';
import Events from 'events';
import MarkupImage from 'image/MarkupImage'
import Bounds from 'util/Bounds'

const minArea = 0.1;

class Repository extends Events.EventEmitter  {
    protected items: Array<Tool> = []

    protected canvas: HTMLCanvasElement;
    protected img: MarkupImage;

    constructor(canvas: HTMLCanvasElement, img: MarkupImage) {
        super()
        this.canvas = canvas
        this.img = img

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
            },
            img: this.img
        });

        toolObject.once('drawingStop', this.onDrawingStop.bind(this))
        toolObject.once('drawingFail', this.onDrawingFail.bind(this))
        


        this.items.push(toolObject)
    }

    onDrawingStop(event: any): void
    {
        console.log('[onDrawingStop]', event)
    }

    onDrawingFail(event: any): void
    {
        const index = this.items.indexOf(event.target);

        console.error(event.text)

        if(index !== -1) {
            this.items.splice(index, 1)
        }
    }

    getItems(): Array<Tool> 
    {
        return this.items
    }
}

export default Repository
