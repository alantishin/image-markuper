import _uniqueId from 'lodash/uniqueId'

class Point {
    public x: number;
    public y: number;

    protected _key: string;

    constructor(x: number, y: number) {
        this._key = _uniqueId('drawable-')
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