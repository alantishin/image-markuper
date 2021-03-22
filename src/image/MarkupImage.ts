import {calculateFitSize} from 'image/ImageHelper'

interface MarkupImageOptions {
    src: string;
    containerWidth: number;
    containerHeight: number;
}

class MarkupImage {

    protected src: string;
    protected loaded: boolean = false;
    protected img: HTMLImageElement;

    protected containerWidth: number;
    protected containerHeight: number;

    protected naturalWidth: number | null = null;
    protected naturalHeight: number | null = null;;

    constructor(options: MarkupImageOptions) {
        this.src = options.src

        this.containerWidth = options.containerWidth;
        this.containerHeight = options.containerHeight;

        this.img = new Image();
        this.img.src = this.src;
        this.img.addEventListener("load", () => {
            this.naturalWidth = this.img.naturalWidth
            this.naturalHeight = this.img.naturalHeight
            this.loaded = true;
        });
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.loaded ) {
            ctx.globalAlpha = 1;

            const srcWidth = this.naturalWidth as number;
            const srcHeight = this.naturalHeight as number;

            const options = calculateFitSize({
                srcWidth: this.naturalWidth as number,
                srcHeight: this.naturalHeight as number,
                maxWidth: this.containerWidth,
                maxHeigth: this.containerHeight
            })

            ctx.drawImage(this.img, options.x, options.y, options.width, options.height);
        }
    }
}

export default MarkupImage