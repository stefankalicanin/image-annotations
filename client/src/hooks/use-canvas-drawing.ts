import React from 'react';

import { drawAnnotations } from '../utils/canvas-drawing';
import { Box } from '../types/annotations';
import { Polygon } from '../types/annotations';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
  boxes: Box[];
  polygons: Polygon[];
  isAnnotationsLoading: boolean;
}

export const useCanvasDrawing = ({
  canvasRef,
  imgRef,
  boxes,
  polygons,
  isAnnotationsLoading,
}: Props) => {
  React.useEffect(() => {
    if (isAnnotationsLoading) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imgRef.current;
    if (!canvas || !ctx || !img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    drawAnnotations(ctx, boxes, polygons);
  }, [isAnnotationsLoading]);
};
