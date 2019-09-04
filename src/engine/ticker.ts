export function setRectangle(gl: WebGL2RenderingContext, x: number, y: number, width: number, height: number) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(getRectanglePositions(x1, x2, y1, y2)), gl.STATIC_DRAW);
}

function getRectanglePositions(x1: number, x2: number, y1: number, y2: number) {
  return [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2];
}

interface Ticker {
  open: number;
  close: number;
  high: number;
  low: number;
  timestamp: number; // should be a Date or string
}

// function setDefaultTickerPoints(gl: WebGL2RenderingContext, ticker: Ticker) {
//   // high/low
//   setRectangle(gl, ticker.high, ticker.timestamp, width, height);
// }

// function setTickerChunk(gl: WebGL2RenderingContext, type: string, chunk: [Ticker]) {
//   chunk.forEach(ticker => {
//     setTickerPoints[type](gl, ticker);
//   });
// }
