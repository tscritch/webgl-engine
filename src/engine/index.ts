import { createShader, createProgram } from './shaders';
let BAR_COLOR = { r: 1, g: 1, b: 1, a: 1 };
let TICKER_TYPE = 'DEFAULT';

// const setTickerPoints: any = {
//   DEFAULT: setDefaultTickerPoints,
//   NONE: () => {}
// };

class Engine {
  private canvas: React.RefObject<HTMLCanvasElement>;
  private gl: WebGL2RenderingContext | null;
  private program: WebGLProgram | null;

  constructor(canvas: React.RefObject<HTMLCanvasElement>) {
    this.canvas = canvas;
    this.gl = this.canvas && this.canvas.current && this.canvas.current.getContext('webgl2');
  }

  async prepare() {
    this.gl = this.canvas && this.canvas.current && this.canvas.current.getContext('webgl2');
    if (!this.gl) throw new Error('Cannot get WebGL2 context.');

    const { gl } = this;

    const v = await createShader(gl, gl.VERTEX_SHADER, 'bar');
    const f = await createShader(gl, gl.FRAGMENT_SHADER, 'bar');

    if (!v || !f) return;

    this.program = createProgram(gl, v, f);
  }

  draw() {
    console.log('drawing to canvas element: ', this.canvas);
    const { gl, program } = this;

    if (!program) return;

    const positionAttributeLocation = gl.getAttribLocation(program, 'v_barData');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const colorLocation = gl.getUniformLocation(program, 'u_color');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);

    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    const count = 6;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.bindVertexArray(vao);

    for (let ii = 0; ii < 50; ++ii) {
      setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

      // gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
      gl.uniform4f(colorLocation, BAR_COLOR.r, BAR_COLOR.g, BAR_COLOR.b, BAR_COLOR.a);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      console.log('drawing triangle: ', ii);
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
