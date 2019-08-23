import React from 'react';
import Engine from '../engine';

class ChartCanvas extends React.Component {
  private canvasRef = React.createRef<HTMLCanvasElement>();
  engine = new Engine(this.canvasRef);

  componentDidMount() {}
  render() {
    return <canvas ref={this.canvasRef}></canvas>;
  }
}

export default ChartCanvas;
