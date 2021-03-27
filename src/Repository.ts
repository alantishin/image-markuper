import Drawable from 'drawable/Drawable';
import Bbox from 'drawable/Bbox';

class Repository {
    protected items: Array<Drawable> = []

    protected canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas

        this.items.push(new Bbox(this.canvas))
    }

    getItems(): Array<Drawable> {
        return this.items
    }
}

export default Repository
