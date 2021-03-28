import Point from 'util/Point'

class Bounds {
    protected point1: Point;
    protected point2: Point;

    constructor(point1: Point, point2: Point) {
        this.point1 = point1;
        this.point2 = point2;
    }

    intersectsPoint(point: Point): boolean
    {
        return (
            point.x > this.xMin &&
            point.x < this.xMax &&
            point.y > this.yMin &&
            point.y < this.yMax
        )
    }

    get xMin(): number
    {
        return Math.min(this.point1.x, this.point2.x)
    }

    get xMax(): number
    {
        return Math.max(this.point1.x, this.point2.x)
    }

    get yMin(): number
    {
        return Math.min(this.point1.y, this.point2.y)
    }

    get yMax(): number
    {
        return Math.max(this.point1.y, this.point2.y)
    }
}

export default Bounds