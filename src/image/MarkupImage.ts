import {calculateFitSize} from 'image/ImageHelper'

interface MarkupImageOptions {
    src: string;
    containerWidth: number;
    containerHeight: number;
    onLoad?: Function
}

class MarkupImage {

    protected src: string;
    protected loaded: boolean = false;
    protected img: HTMLImageElement;

    protected containerWidth: number;
    protected containerHeight: number;

    protected naturalWidth: number | null = null;
    protected naturalHeight: number | null = null;

    protected _cWidth: number | null = null
    protected _cHeight: number | null = null

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

            if (options.onLoad) {
                options.onLoad()
            }
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

            this._cWidth = options.width
            this._cHeight = options.height

            ctx.drawImage(this.img, options.x, options.y, options.width, options.height);
        }
    }

    get cWidth(): number | null
    {
        return this._cWidth
    }

    get cHeight(): number | null
    {
        return this._cHeight
    }

    get cArea(): number | null
    {
        if(this.cWidth && this.cHeight) {
            return this.cWidth * this.cHeight
        } 

        return null;
    }
}

export default MarkupImage