// Loop path in % of the landing art box: a flat ellipse in the open sea BELOW the islands and white pills (islands end ~84%).
export const SHIP_PATH = { cx: 50, cy: 91.5, rx: 27, ry: 2.6, steps: 16, scaleFar: 0.85, scaleNear: 1.15 };
export function shipKeyframes(path = SHIP_PATH) {
  const out = [];
  for (let i = 0; i <= path.steps; i++) {
    const th = (i / path.steps) * Math.PI * 2, s = Math.sin(th);
    const x = path.cx + path.rx * Math.cos(th), y = path.cy + path.ry * s;
    const sc = path.scaleFar + ((s + 1) / 2) * (path.scaleNear - path.scaleFar); // near = bottom of the loop = bigger
    out.push(`${((i / path.steps) * 100).toFixed(2)}%{left:${x.toFixed(2)}%;top:${y.toFixed(2)}%;transform:translate(-50%,-50%) scale(${sc.toFixed(3)})}`);
  }
  return out.join("");
}

