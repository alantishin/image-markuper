import Point from 'geom/Point'

export default function (points: Array<Point>, point: Point): boolean {
    const x = point.x
    const y = point.y
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