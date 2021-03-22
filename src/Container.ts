import Repository from 'Repository'

class Container
{
    protected canvas: HTMLCanvasElement
    protected ctx: CanvasRenderingContext2D
    protected repository: Repository

    constructor(selector: string, width: number, height: number) {
        this.canvas = document.querySelector(selector) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
   
        this.canvas.width = width;
        this.canvas.height = height;

        // this.canvas.width = window.innerWidth;
        // this.canvas.height = window.innerHeight;

        this.repository = new Repository(this.canvas)

        window.requestAnimationFrame(this.draw.bind(this));
    }

    draw() {
        this.clear()

        const items = this.repository.getItems()

        for(const item of items) {
            item.draw(this.ctx)
        }

        window.requestAnimationFrame(this.draw.bind(this));
    }

    clear() {
        const width = this.canvas.width;
        const height = this.canvas.height;

        this.ctx.clearRect(0, 0, width, height);
    }
}

export default Container