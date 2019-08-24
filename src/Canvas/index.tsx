import React from 'react';
import Engine from '../engine';

class ChartCanvas extends React.Component {
  private canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
  engine = new Engine(this.canvasRef);

  componentDidMount() {
    this.engine.prepare();
    this.engine.draw();
  }

  render() {
    return <canvas ref={this.canvasRef}></canvas>;
  }
}

export default ChartCanvas;
