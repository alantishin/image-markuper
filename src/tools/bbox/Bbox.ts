import Tool from 'tools/Tool'
import Bounds from 'util/Bounds'
import BboxDrawer from 'tools/bbox/BboxDrawer'
import BboxEditor from 'tools/bbox/BboxEditor'

interface BboxParams {
    canvas: HTMLCanvasElement;
    drawer?: {
        event: MouseEvent
    }
}

class Bbox extends Tool {
    protected drawer: BboxDrawer | null;
    protected editor: BboxEditor | null;
    protected canvas: HTMLCanvasElement;

    constructor(params: BboxParams) {
        super();

        this.canvas = params.canvas;
        this.drawer = null;
        this.editor = null;

        if (params.drawer) {
            this.initDrawer(params);
        }
    }

    initDrawer(params: BboxParams): void
    {
        this.drawer = new BboxDrawer({
            canvas: this.canvas,
            drawer: {
                event: params.drawer?.event as MouseEvent
            }
        })

        this.drawer.once('drawingStop', this.onDrawingStop.bind(this))
    }

    initEditor(bounds: Bounds): void
    {
        this.editor = new BboxEditor(this.canvas, bounds)
    }

    onDrawingStop(event: any)
    {
        this.emit('drawingStop', event)
        this.drawer = null;

        this.initEditor(event.bounds);
    }

    draw(ctx: CanvasRenderingContext2D): void 
    {
        if(this.drawer) {
            this.drawer.draw(ctx)
        }

        if (this.editor) {
            this.editor.draw(ctx)
        }
    }

    hasHoverEditor(): boolean {
        if(this.editor) {
            return this.editor.hasHoverEditor()
        }

        return false
    }
}

export default Bbox