import { createShader, createProgram } from './shaders';
import MyFirstShader from './shaders/MyFirstShader';
class Engine {
  private canvas: React.RefObject<HTMLCanvasElement>;
  private context: WebGL2RenderingContext | null;

  constructor(canvas: React.RefObject<HTMLCanvasElement>) {
    this.canvas = canvas;
    this.context = this.canvas && this.canvas.current && this.canvas.current.getContext('webgl2');
  }

  prepare() {
    this.context = this.canvas && this.canvas.current && this.canvas.current.getContext('webgl2');
    if (!this.context) throw new Error('Cannot get WebGL2 context.');

    const v = createShader(this.context, this.context.VERTEX_SHADER, MyFirstShader.vertex);
    const f = createShader(this.context, this.context.FRAGMENT_SHADER, MyFirstShader.frag);
  }

  draw() {
    console.log('drawing to canvas element: ', this.canvas);
  }
}

export default Engine;
