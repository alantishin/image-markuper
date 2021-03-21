abstract class Drawable {
    protected ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
}

export default Drawable