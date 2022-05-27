export const intersects = (
  x1: number,
  y1: number,
  w1: number,
  h1: number,

  x2: number,
  y2: number,
  w2: number,
  h2: number,
) => {
  const xx1 = x1 + w1;
  const yy1 = y1 + h1;

  const xx2 = x2 + w2;
  const yy2 = y2 + h2;

  if (x1 >= xx2 || x2 >= xx1) return false;
  if (y1 >= yy2 || y2 >= yy1) return false;
  return true;
};
