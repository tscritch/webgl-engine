import getShaderType from '../utils/getShaderType';

export async function createShader(gl: WebGL2RenderingContext, type: number, name: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Error creating shader.');

  const shaderFile = await getShaderFromFile(name, type);
  if (!shaderFile) throw new Error('Error creating shader.');

  gl.shaderSource(shader, shaderFile);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) return shader;

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

export function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragShader: WebGLShader) {
  const program = gl.createProgram();
  if (!program) throw new Error('Error creating program.');
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

async function getShaderFromFile(name: string, type: number) {
  if (!['vert', 'frag'].includes(getShaderType(type)))
    throw new Error(
      `Tried to get shader from file but invalid type provided: ${type}. Please provide a valid type: vert | frag`
    );
  try {
    const url = `${process.env.PUBLIC_URL}/shaders/${name}/${name}.${getShaderType(type)}`;
    return await fetch(url).then(res => res.text());
  } catch (e) {
    console.error(`Could not load shader with name ${name} or type ${type}.`);
  }
}
