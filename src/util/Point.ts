class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    distancePoint(point: Point): number {
        const a = this.x - point.x;
        const b = this.y - point.y;
        return Math.sqrt(a * a + b * b);
    }
}

export default Point