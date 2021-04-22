import Point from 'geom/Point'

class Polygon {
    public points: Array<Point> = []

    constructor(points: Array<Point> = []) {
        this.points = points
    }

    containsPoint(point: Point): boolean
    {
        const x = point.x
        const y = point.y
        const points = this.points
        let contains = false

        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const xi = points[i].x
            const yi = points[i].y
            const xj = points[j].x
            const yj = points[j].y

            if (
                ((yi > y) != (yj > y)) && 
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
            ) {
                contains = !contains
            }
        }

        return contains
    }
}

export default Polygon