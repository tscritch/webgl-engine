class Engine {
  canvas: React.Ref<HTMLCanvasElement>;

  constructor(canvas: React.Ref<HTMLCanvasElement>) {
    this.canvas = canvas;
  }
}

export default Engine;
