import { createShader, createProgram } from './shaders';
import MyFirstShader from './shaders/MyFirstShader';
class Engine {
  private canvas: React.RefObject<HTMLCanvasElement>;
  private gl: WebGL2RenderingContext | null;

  constructor(canvas: React.RefObject<HTMLCanvasElement>) {
    this.canvas = canvas;
    this.gl = this.canvas && this.canvas.current && this.canvas.current.getContext('webgl2');
  }

  prepare() {
    this.gl = this.canvas && this.canvas.current && this.canvas.current.getContext('webgl2');
    if (!this.gl) throw new Error('Cannot get WebGL2 context.');
    let gl = this.gl;

    const v = createShader(gl, gl.VERTEX_SHADER, MyFirstShader.vertex);
    const f = createShader(gl, gl.FRAGMENT_SHADER, MyFirstShader.frag);

    if (!v || !f) return;

    const program = createProgram(gl, v, f);

    if (!program) return;

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
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

      gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      console.log('drawing triangle: ', ii);
    }
  }

  draw() {
    console.log('drawing to canvas element: ', this.canvas);
    let gl = this.gl;
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
