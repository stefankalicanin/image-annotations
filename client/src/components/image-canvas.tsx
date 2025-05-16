import React from 'react';

import { toast } from 'react-toastify';

import { ToolBar } from './tool-bar';
import { Loading } from './loading';
import { useCanvasDrawing } from '../hooks/use-canvas-drawing';
import { useAnnotations } from '../hooks/use-annotations';
import { useCanvasPreparation } from '../hooks/use-canvas-preparation';
import { useCanvasInteraction } from '../hooks/use-canvas-interaction';
import { createAnnotations } from '../service/annotation-service';
import { scaleBoxForExport } from '../utils/canvas-drawing';
import { scalePolygonForExport } from '../utils/canvas-drawing';
import { Polygon } from '../types/annotations';
import { Point } from '../types/annotations';
import { Box } from '../types/annotations';
import { Tool } from '../types/annotations';
import { AnnotationsCreateIn } from '../types/api';

interface Props {
  imageUrl: string;
  imageId: string;
  close: () => void;
}

export const ImageCanvas: React.FC<Props> = ({ imageUrl, imageId, close }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(new Image());

  const [tool, setTool] = React.useState<Tool>('box');
  const [currentPolygon, setCurrentPolygon] = React.useState<Point[]>([]);

  const [isImageLoading, setIsImageLoading] = React.useState<boolean>(true);
  const [isAnnotationsLoading, setIsAnnotationsLoading] = React.useState<boolean>(true);
  const isLoading = isImageLoading || isAnnotationsLoading;

  const { scale } = useCanvasPreparation({
    canvasRef,
    imgRef,
    imageUrl,
    setIsImageLoading,
  });

  const { boxes, polygons, hasAnnotations, setBoxes, setPolygons } = useAnnotations({
    imageId,
    scale,
    isImageLoading,
    setIsAnnotationsLoading,
  });

  useCanvasDrawing({
    canvasRef,
    imgRef,
    boxes,
    polygons,
    isAnnotationsLoading,
  });

  const canvasEvents = useCanvasInteraction({
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
  });

  const exportAnnotations = async () => {
    try {
      const scaledBoxes: Box[] = boxes.map((box: Box) => scaleBoxForExport(box, scale));
      const scaledPolygons: Polygon[] = polygons.map((polygon: Polygon) =>
        scalePolygonForExport(polygon, scale),
      );
      const payload: AnnotationsCreateIn = {
        annotations: [...scaledBoxes, ...scaledPolygons],
      };
      const response = await createAnnotations(imageId, payload);
      toast.success(response.message);
      close();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toolChange = (tool: Tool) => {
    setTool(tool);
    setCurrentPolygon([]);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="text-white">
        <p className="px-4 py-2  text-xl font-semibold text-center">
          {hasAnnotations && 'You can only view and download annotations.'}
        </p>
      </div>
      {!isLoading ? (
        <ToolBar
          currentTool={tool}
          onToolChange={toolChange}
          onExportAnnotations={exportAnnotations}
          onClose={close}
          hasAnnotations={hasAnnotations}
          imageId={imageId}
        />
      ) : (
        <Loading />
      )}
      <canvas
        ref={canvasRef}
        className="border-4 border-[#27272a] rounded-md w-[80vw]"
        {...canvasEvents}
      />
    </div>
  );
};
