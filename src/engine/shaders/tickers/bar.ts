import { createShader, createProgram } from '../../shaders';
const BAR_COLOR = { r: 1, g: 1, b: 1, a: 1 };

export default async function(gl: WebGL2RenderingContext) {
  const v = await createShader(gl, gl.VERTEX_SHADER, 'bar');
  const f = await createShader(gl, gl.FRAGMENT_SHADER, 'bar');

  if (!v || !f) return;

  const program = createProgram(gl, v, f);

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

  gl.useProgram(program);

  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.bindVertexArray(vao);

  gl.uniform4f(colorLocation, BAR_COLOR.r, BAR_COLOR.g, BAR_COLOR.b, BAR_COLOR.a);
}
