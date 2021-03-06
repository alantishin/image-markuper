import Repository from 'Repository'
import MarkupImage from 'image/MarkupImage'
import Point from 'geom/Point'

interface ContainerOptions {
    selector: string;
    width: number;
    height: number;
    image: string;
}

class Container
{
    protected canvas: HTMLCanvasElement
    protected ctx: CanvasRenderingContext2D
    protected repository: Repository | null = null
    protected image: MarkupImage

    constructor(options: ContainerOptions) {
        this.canvas = document.querySelector(options.selector) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
   
        this.canvas.width = options.width;
        this.canvas.height = options.height;

        // this.canvas.width = window.innerWidth;
        // this.canvas.height = window.innerHeight;

        this.image = new MarkupImage({
            src: options.image,
            containerWidth: this.canvas.width,
            containerHeight: this.canvas.height,
            onLoad: () => {
                this.repository = new Repository(this.canvas, this.image);
                window.requestAnimationFrame(this.draw.bind(this));
            }
        });
        
        
    }

    draw(): void {
        if(! this.repository) {
            return ;
        }

        this.clear()
        this.image.draw(this.ctx)
        const items = this.repository.getItems()

        for(const item of items) {
            item.draw(this.ctx)
        }

        window.requestAnimationFrame(this.draw.bind(this));
    }

    clear(): void {
        const width = this.canvas.width;
        const height = this.canvas.height;

        this.ctx.clearRect(0, 0, width, height);
    }
}

export default Container