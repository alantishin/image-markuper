import Point from 'geom/Point'

class Polygon {
    public points: Array<Point> = []

    constructor(points: Array<Point> = []) {
        this.points = points
    }
}

export default Polygon