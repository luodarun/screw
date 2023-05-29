// 在数字区间内获取一个随机数
const random = (..._args: number[]) => {
    let [min, max] = _args;
    if (_args.length < 2) {
        max = min;
        min = 0;
    }
    // 交换位置
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// 星星移动范围，值越大范围越小
function maxOrbit(x: number, y: number) {
    const max = Math.max(x, y);
    const diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
}
// 创建一个代表星星的canvas对象
const createStarCanvas = () => {
    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    const half = canvas2.width / 2;
    const gradient2 = ctx2?.createRadialGradient(
        half,
        half,
        0,
        half,
        half,
        half
    );
    gradient2?.addColorStop(0.025, '#CCC');
    gradient2?.addColorStop(0.1, 'hsl(217, 61%, 33%)');
    gradient2?.addColorStop(0.25, 'hsl(217, 64%, 6%)');
    gradient2?.addColorStop(1, 'transparent');
    if (ctx2 && gradient2) {
        ctx2.fillStyle = gradient2;
    }
    ctx2?.beginPath();
    ctx2?.arc(half, half, half, 0, Math.PI * 2);
    ctx2?.fill();
    return canvas2;
};
class Star {
    orbitRadius: number;
    radius: number;
    orbitX: number; // 星星大小
    orbitY: number; // 星星大小
    timePassed: number;
    speed: number; // 星星移动速度
    alpha: number;
    constructor(w: number, h: number, maxStars: number) {
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 18;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 500000;
        this.alpha = random(2, 10) / 10;
    }
    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
        const twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(
            canvas,
            x - this.radius / 2,
            y - this.radius / 2,
            this.radius,
            this.radius
        );
        this.timePassed += this.speed;
    }
}

export function createStarryBg(canvas: HTMLCanvasElement, maxStars: number) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const stars: Star[] = [];
    const starCanvas = createStarCanvas();
    for (let i = 0; i < maxStars; i++) {
        stars[i] = new Star(w, h, maxStars);
    }
    function animation() {
        if (!ctx) {
            return;
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.5; // 尾巴
        ctx.fillStyle = 'hsla(217, 64%, 6%, 2)';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 1, l = stars.length; i < l; i++) {
            stars[i].draw(ctx, starCanvas);
        }
        window.requestAnimationFrame(animation);
    }
    animation();
}
