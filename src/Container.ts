import Bbox from 'Bbox'

class Container
{
    protected canvas: HTMLCanvasElement
    protected ctx: CanvasRenderingContext2D
    protected items: Array<Bbox>;

    constructor(selector: string) {
        this.canvas = document.querySelector(selector) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
   
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.items = [
            new Bbox(this.ctx)
        ]

        this.canvas.addEventListener('click', (event) => {
            console.log('clicked', event)

            this.items[0].x = event.offsetX;
            this.items[0].y = event.offsetY;
        })

        this.canvas.addEventListener('mousemove', (event) => {
            this.items[0].x = event.offsetX;
            this.items[0].y = event.offsetY;
        })

        

        window.requestAnimationFrame(this.draw.bind(this));
    }

    draw() {
        this.clear()

        for(const item of this.items) {
            item.draw()
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