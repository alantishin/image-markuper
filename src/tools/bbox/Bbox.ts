import Tool from 'tools/Tool'
import Bounds from 'util/Bounds'
import BboxDrawer from 'tools/bbox/BboxDrawer'
import BboxEditor from 'tools/bbox/BboxEditor'
import MarkupImage from 'image/MarkupImage'

interface BboxParams {
    canvas: HTMLCanvasElement;
    drawer?: {
        event: MouseEvent
    },
    img: MarkupImage
}

const MIN_AREA = 0.5

class Bbox extends Tool {
    protected drawer: BboxDrawer | null;
    protected editor: BboxEditor | null;
    protected canvas: HTMLCanvasElement;
    protected img: MarkupImage

    constructor(params: BboxParams) {
        super();

        this.canvas = params.canvas;
        this.drawer = null;
        this.editor = null;

        this.img = params.img

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
        const minSizePassed = this.checkMinArea(
            this.img.cArea as number,
            MIN_AREA,
            event.bounds
        )

        this.drawer = null;

        if(!minSizePassed) {
            this.emit('drawingFail', {
                target: this,
                text: "Min area check not passed"
            })

            return ;
        }

        this.emit('drawingStop', {
            target: this,
            bounds: event.event,
        })

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

    isFocused(): boolean {
        if(this.drawer) {
            return true
        }

        if(this.editor) {
            return this.editor.hasHoverEditor()
        }

        return false
    }
}

export default Bbox