import React from 'react';
import Engine from '../engine';

class ChartCanvas extends React.Component {
  private canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
  engine = new Engine(this.canvasRef);

  componentDidMount() {
    this.engine.prepare().then(_ => {
      this.engine.draw();
    });
  }

  render() {
    return (
      <React.Fragment>
        <canvas ref={this.canvasRef} width={800} height={600} style={{ width: '800px', height: '600px' }}></canvas>
        <button style={{ margin: '20px', padding: '10px' }} onClick={() => this.engine.draw()}>
          draw
        </button>
      </React.Fragment>
    );
  }
}

export default ChartCanvas;
