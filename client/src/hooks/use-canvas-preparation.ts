import React from 'react';

import { config } from '../config/config';
import { Scale } from '../types/annotations';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  imgRef: React.RefObject<HTMLImageElement>;
  imageUrl: string;
  setIsImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCanvasPreparation = ({ imageUrl, setIsImageLoading, canvasRef, imgRef }: Props) => {
  const [scale, setScale] = React.useState<Scale>({
    scaleX: 1,
    scaleY: 1,
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = imgRef.current;
    img.src = `${config.baseUrl}/${imageUrl}`;
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;

      const displayWidth = window.innerWidth * 0.8;
      const displayHeight = displayWidth / ratio;

      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      canvas.width = displayWidth;
      canvas.height = displayHeight;

      ctx.lineWidth = 2;
      ctx.drawImage(img, 0, 0, displayWidth, displayHeight);

      setScale({
        scaleX: img.naturalWidth / canvas.width,
        scaleY: img.naturalHeight / canvas.height,
      });
      setIsImageLoading(false);
    };
  }, []);

  return { scale, canvasRef, imgRef };
};
