class Bbox
{
    protected ctx: CanvasRenderingContext2D;

    public x: number | null = null;
    public y: number | null = null;
    public width: number | null = 100;
    public height: number | null = 100;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    draw() {
        if (this.x && this.y) {
            this.ctx.fillRect(this.x, this.y, 100, 100)
        }
    }
}

export default Bbox