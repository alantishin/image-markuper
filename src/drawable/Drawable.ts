import DrawableOptions from 'drawable/DrawableOptions'

abstract class Drawable {
    protected ctx: CanvasRenderingContext2D;
    protected options: DrawableOptions;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.options = new DrawableOptions()
    }
}

export default Drawable