import Point from 'geom/Point'

export default function (point1: Point, point2: Point): Point
{
    const x = (point1.x + point2.x) / 2
    const y = (point1.y + point2.y) / 2

    return new Point(x, y)
}