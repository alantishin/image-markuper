import Tool from 'tools/Tool'
import Bounds from 'util/Bounds'
import PolygonDrawer from 'tools/polygon/PolygonDrawer'
import BboxEditor from 'tools/bbox/BboxEditor'
import MarkupImage from 'image/MarkupImage'

interface PolygonParams {
    canvas: HTMLCanvasElement;
    drawer?: {
        event: MouseEvent
    },
    img: MarkupImage
}

const MIN_AREA = 0.5

class Polygon extends Tool {
    protected drawer: PolygonDrawer | null;
    protected editor: BboxEditor | null;
    protected canvas: HTMLCanvasElement;
    protected img: MarkupImage

    constructor(params: PolygonParams) {
        super();

        this.canvas = params.canvas;
        this.drawer = null;
        this.editor = null;

        this.img = params.img

        if (params.drawer) {
            this.initDrawer(params);
        }
    }

    initDrawer(params: PolygonParams): void
    {
        this.drawer = new PolygonDrawer({
            canvas: this.canvas,
            drawer: {
                event: params.drawer?.event as MouseEvent
            }
        })

        this.drawer.once('drawingStop', this.onDrawingStop.bind(this))
    }

    initEditor(bounds: Bounds): void
    {

    }

    onDrawingStop(event: any)
    {

    }

    draw(ctx: CanvasRenderingContext2D): void 
    {
        // if(this.drawer) {
        //     this.drawer.draw(ctx)
        // }

        // if (this.editor) {
        //     this.editor.draw(ctx)
        // }
    }

    hasHoverEditor(): boolean {
        // if(this.editor) {
        //     return this.editor.hasHoverEditor()
        // }

        return false
    }
}

export default Polygon