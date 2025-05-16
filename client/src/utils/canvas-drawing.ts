import { Box } from '../types/annotations';
import { Polygon } from '../types/annotations';
import { Point } from '../types/annotations';
import { Scale } from '../types/annotations';
import { BoxPoints } from '../types/annotations';

export const drawBox = (ctx: CanvasRenderingContext2D, box: Box) => {
  ctx.strokeStyle = 'red';
  ctx.strokeRect(box.x, box.y, box.w, box.h);
};

export const drawPolygon = (ctx: CanvasRenderingContext2D, polygon: Polygon): void => {
  ctx.beginPath();
  ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
  polygon.points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.closePath();
  ctx.strokeStyle = 'green';
  ctx.stroke();
};

export const drawAnnotations = (
  ctx: CanvasRenderingContext2D,
  boxes: Box[],
  polygons: Polygon[],
): void => {
  boxes.map((box) => drawBox(ctx, box));
  polygons.map((polygon) => drawPolygon(ctx, polygon));
};

export const scaleBoxForDisplay = (box: Box, scale: Scale): Box => {
  return {
    ...box,
    x: box.x / scale.scaleX,
    y: box.y / scale.scaleY,
    w: box.w / scale.scaleX,
    h: box.h / scale.scaleY,
  };
};

export const scalePolygonForDisplay = (polygon: Polygon, scale: Scale): Polygon => {
  return {
    ...polygon,
    points: polygon.points.map((pt) => ({
      x: pt.x / scale.scaleX,
      y: pt.y / scale.scaleY,
    })),
  };
};

export const scaleBoxForExport = (box: Box, scale: Scale): Box => {
  return {
    ...box,
    x: box.x * scale.scaleX,
    y: box.y * scale.scaleY,
    w: box.w * scale.scaleX,
    h: box.h * scale.scaleY,
  };
};

export const scalePolygonForExport = (polygon: Polygon, scale: Scale): Polygon => {
  return {
    ...polygon,
    points: polygon.points.map((pt) => ({
      x: pt.x * scale.scaleX,
      y: pt.y * scale.scaleY,
    })),
  };
};

export const getMousePos = (
  canvas: HTMLCanvasElement,
  evt: React.MouseEvent<HTMLCanvasElement>,
): Point => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
};

export const getDistance = (p1: Point, p2: Point): number => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

export const getBoxPoints = (startPoint: Point, currentPoint: Point): BoxPoints => {
  const x = Math.min(startPoint.x, currentPoint.x);
  const y = Math.min(startPoint.y, currentPoint.y);
  const w = Math.abs(currentPoint.x - startPoint.x);
  const h = Math.abs(currentPoint.y - startPoint.y);

  return { x, y, w, h };
};
