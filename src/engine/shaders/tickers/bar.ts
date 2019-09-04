import { createShader, createProgram } from '../../shaders';
const BAR_COLOR = { r: 1, g: 1, b: 1, a: 1 };

class BarProgram {
  private size = 2;
  private normalize = false;
  private stride = 0;
  private offset = 0;
  private count = 3;

  async prepare(gl: WebGL2RenderingContext) {
    const v = await createShader(gl, gl.VERTEX_SHADER, 'bar');
    const f = await createShader(gl, gl.FRAGMENT_SHADER, 'bar');

    if (!v || !f) return;

    const program = createProgram(gl, v, f);

    const positionAttributeLocation = gl.getAttribLocation(program, 'v_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const colorLocation = gl.getUniformLocation(program, 'u_color');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.vertexAttribPointer(positionAttributeLocation, this.size, gl.FLOAT, this.normalize, this.stride, this.offset);

    gl.useProgram(program);

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.bindVertexArray(vao);

    gl.uniform4f(colorLocation, BAR_COLOR.r, BAR_COLOR.g, BAR_COLOR.b, BAR_COLOR.a);
  }
}

export default new BarProgram();
