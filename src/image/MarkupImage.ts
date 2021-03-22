
class MarkupImage {

    protected src: string;
    protected loaded: boolean = false;
    protected img: HTMLImageElement;

    constructor(src: string) {
        this.src = src

        this.img = new Image();
        this.img.src = this.src;
        this.img.addEventListener("load", () => {
            this.loaded = true;
        });
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.loaded) {
            ctx.globalAlpha = 1;
            ctx.drawImage(this.img, 100, 100);
        }
    }
}

export default MarkupImage