import BarProgram from './shaders/tickers/bar';
let TICKER_TYPE = 'DEFAULT';

// const setTickerPoints: any = {
//   DEFAULT: setDefaultTickerPoints,
//   NONE: () => {}
// };

class Engine {
  private canvas: React.RefObject<HTMLCanvasElement>;
  private gl: WebGL2RenderingContext | null;

  constructor(canvas: React.RefObject<HTMLCanvasElement>) {
    this.canvas = canvas;
    this.gl = this.canvas && this.canvas.current && this.canvas.current.getContext('webgl2');
  }

  async prepare() {
    this.gl = this.canvas && this.canvas.current && this.canvas.current.getContext('webgl2');
    if (!this.gl) throw new Error('Cannot get WebGL2 context.');

    const { gl } = this;

    await BarProgram.prepare(gl);
  }

  draw() {
    // console.log('drawing to canvas element: ', this.canvas);
    const { gl } = this;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let ii = 0; ii < 50; ++ii) {
      setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      // console.log('drawing triangle: ', ii);
    }
  }
}

function randomInt(range: number) {
  return Math.floor(Math.random() * range);
}

function setRectangle(gl: WebGL2RenderingContext, x: number, y: number, width: number, height: number) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(getRectanglePositions(x1, x2, y1, y2)), gl.STATIC_DRAW);
}

function getRectanglePositions(x1: number, x2: number, y1: number, y2: number) {
  return [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2];
}

export default Engine;
