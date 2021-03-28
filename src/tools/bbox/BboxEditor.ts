import Tool from 'tools/Tool'
import Point from 'util/Point'
import { pointFromEvent, MouseEventsTypes } from 'util/MouseEventHelper';
import Bounds from 'util/Bounds'
import _cloneDeep from 'lodash/cloneDeep'

interface BboxParams {
    canvas: HTMLCanvasElement
}

enum editorStatus {
    none = "none",
    drawingStart = "drawingStart",
    drawingProgress = "drawingProgress"
}

class BboxEditor extends Tool {

    protected points: Array<Point>

    constructor(bounds: Bounds) {
        super();

        this.points = [
            _cloneDeep(bounds.topLeft),
            _cloneDeep(bounds.topRight),
            _cloneDeep(bounds.bottomLeft),
            _cloneDeep(bounds.bottomRight),
        ]
    }

    get xMin(): number {
        const x = this.points.map(el => el.x)

        return Math.min(...x)
    }

    get yMin(): number {
        const y = this.points.map(el => el.y)

        return Math.min(...y)
    }

    get xMax(): number {
        const x = this.points.map(el => el.x)

        return Math.max(...x)
    }

    get yMax(): number {
        const y = this.points.map(el => el.y)

        return Math.max(...y)
    }

    get width(): number {
        return this.xMax - this.xMin;
    }

    get height(): number {
        return this.yMax - this.yMin
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        this.options.apply(ctx);
        ctx.rect(this.xMin, this.yMin, this.width, this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

export default BboxEditor
