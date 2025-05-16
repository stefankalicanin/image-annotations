import React from 'react';

import { toast } from 'react-toastify';

import { getAnnotations } from '../service/annotation-service';
import { scaleBoxForDisplay } from '../utils/canvas-drawing';
import { scalePolygonForDisplay } from '../utils/canvas-drawing';
import { Box } from '../types/annotations';
import { Polygon } from '../types/annotations';
import { Scale } from '../types/annotations';

interface Props {
  imageId: string;
  scale: Scale;
  isImageLoading: boolean;
  setIsAnnotationsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAnnotations = ({
  imageId,
  scale,
  isImageLoading,
  setIsAnnotationsLoading,
}: Props) => {
  const [boxes, setBoxes] = React.useState<Box[]>([]);
  const [polygons, setPolygons] = React.useState<Polygon[]>([]);
  const [hasAnnotations, setHasAnnotations] = React.useState<boolean>(false);

  const fetchAnnotations = async () => {
    if (isImageLoading) return;

    try {
      const response = await getAnnotations(imageId);
      const annotations = response.data.annotations;
      if (annotations.length > 0) {
        const boxes = annotations.filter((a) => a.type === 'box') as Box[];
        const polygons = annotations.filter((a) => a.type === 'polygon') as Polygon[];
        const scaledBoxes: Box[] = boxes.map((box) => scaleBoxForDisplay(box, scale));
        const scaledPolygons: Polygon[] = polygons.map((polygon) =>
          scalePolygonForDisplay(polygon, scale),
        );
        setBoxes(scaledBoxes);
        setPolygons(scaledPolygons);
        setHasAnnotations(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsAnnotationsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAnnotations();
  }, [isImageLoading]);

  return {
    boxes,
    polygons,
    hasAnnotations,
    setBoxes,
    setPolygons,
  };
};
