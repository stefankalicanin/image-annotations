import React from 'react';

import { drawBox } from '../utils/canvas-drawing';
import { drawPolygon } from '../utils/canvas-drawing';
import { getMousePos } from '../utils/canvas-drawing';
import { getDistance } from '../utils/canvas-drawing';
import { getBoxPoints } from '../utils/canvas-drawing';
import { Box } from '../types/annotations';
import { Polygon } from '../types/annotations';
import { Point } from '../types/annotations';
import { Tool } from '../types/annotations';

interface Props {
  tool: Tool;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>;
  setPolygons: React.Dispatch<React.SetStateAction<Polygon[]>>;
  currentPolygon: Point[];
  setCurrentPolygon: React.Dispatch<React.SetStateAction<Point[]>>;
  hasAnnotations: boolean;
  imgRef: React.RefObject<HTMLImageElement>;
  boxes: Box[];
  polygons: Polygon[];
}

export const useCanvasInteraction = ({
  tool,
  canvasRef,
  setBoxes,
  setPolygons,
  currentPolygon,
  setCurrentPolygon,
  hasAnnotations,
  imgRef,
  boxes,
  polygons,
}: Props) => {
  const [startPoint, setStartPoint] = React.useState<Point | null>(null);
  const canvas = canvasRef.current;
  const img = imgRef.current;

  if (hasAnnotations || !canvas || !img) return {};

  return {
    onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (tool !== 'box') return;
      const pos = getMousePos(canvas, e);
      setStartPoint(pos);
    },

    onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!startPoint || tool !== 'box') return;

      const pos = getMousePos(canvas, e);

      const { x, y, w, h } = getBoxPoints(startPoint, pos);

      const box: Box = {
        type: 'box',
        x: x,
        y: y,
        w: w,
        h: h,
      };
      setBoxes((prev) => [...prev, box]);

      setStartPoint(null);
    },

    onClick: (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (tool !== 'polygon') return;

      const pos = getMousePos(canvas, e);

      if (currentPolygon.length > 2 && getDistance(currentPolygon[0], pos) < 10) {
        const polygon: Polygon = {
          type: 'polygon',
          points: [...currentPolygon],
        };
        setPolygons((prev) => [...prev, polygon]);
        setCurrentPolygon([]);
      } else {
        setCurrentPolygon([...currentPolygon, pos]);
      }
    },

    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => {
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      const pos = getMousePos(canvas, e);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      boxes.map((box) => drawBox(ctx, box));
      polygons.map((polygon) => drawPolygon(ctx, polygon));

      if (tool === 'box' && startPoint) {
        const { x, y, w, h } = getBoxPoints(startPoint, pos);
        const box: Box = {
          type: 'box',
          x: x,
          y: y,
          w: w,
          h: h,
        };
        drawBox(ctx, box);
      }

      if (tool === 'polygon' && currentPolygon.length > 0) {
        ctx.beginPath();
        const [first, ...rest] = currentPolygon;
        ctx.moveTo(first.x, first.y);
        rest.forEach((pt) => ctx.lineTo(pt.x, pt.y));
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = 'green';
        ctx.stroke();
      }
    },
  };
};
