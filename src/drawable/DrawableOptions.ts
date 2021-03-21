class DrawableOptions {
    public alpha: number = 0.4

    apply(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha;
    }
}

export default DrawableOptions