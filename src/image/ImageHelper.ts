
interface calculateFitSizeOptions {
    srcWidth: number;
    srcHeight: number;
    maxWidth: number;
    maxHeigth: number;
}

interface calculateFitSizeResult {
    height: number;
    width: number;
    x: number;
    y: number;
}

export const calculateFitSize = function (options: calculateFitSizeOptions): calculateFitSizeResult {
    const imageAspectRatio = options.srcWidth / options.srcHeight;
    const canvasAspectRatio = options.maxWidth / options.maxHeigth;

    let renderableHeight = null;
    let renderableWidth = null;
    let xStart = null;
    let yStart = null;

    if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = options.maxHeigth;
        renderableWidth = options.srcWidth * (renderableHeight / options.srcHeight);
        xStart = (options.maxWidth - renderableWidth) / 2;
        yStart = 0;
    } else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = options.maxWidth
        renderableHeight = options.srcHeight * (renderableWidth / options.srcWidth);
        xStart = 0;
        yStart = (options.maxHeigth - renderableHeight) / 2;

    } else {
        renderableHeight = options.maxHeigth;
        renderableWidth = options.maxWidth;
        xStart = 0;
        yStart = 0;
    }

    return {
        height: renderableHeight,
        width: renderableWidth,
        x: xStart,
        y: yStart
    }
}