class DrawableOptions {
    public opacity: number = 0.4
    public fillColor: string = 'orange'
    public strokeColor: string = 'red'
    public strokeWidth: number = 2

    apply(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.fillColor
        ctx.strokeStyle = this.strokeColor
        ctx.lineWidth = this.strokeWidth;
    }
}

export default DrawableOptions