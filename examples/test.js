const canvas = document.querySelector('canvas') as HTMLCanvasElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d') as CanvasRenderingContext2D

c.fillRect(100, 100, 100, 100)

let myReq: number;

const animate = function() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const h = Math.random() * 100;
    const w = Math.random() * 100;

    c.fillRect(x, y, h, w)



    myReq = window.requestAnimationFrame(animate);
}

animate()

setTimeout(() =>{
    console.log('stop')
    cancelAnimationFrame(myReq);
}, 5000)