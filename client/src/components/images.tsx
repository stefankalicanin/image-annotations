import React from 'react';
import { toast } from 'react-toastify';

import { fetcher } from '../service/fetcher';
import { ImagesGetOutResponse } from '../types/images';
import { ImageGetOut } from '../types/images';
import { config } from '../config/config';

export const Images: React.FC = () => {
  const [images, setImages] = React.useState<ImageGetOut[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getImages = async () => {
    try {
      const response = await fetcher<ImagesGetOutResponse>('/images', {
        method: 'GET',
      });
      setImages(response.data.images);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeImage = () => setSelectedImage(null);

  React.useEffect(() => {
    getImages();
  }, []);

  React.useEffect(() => {
    if (!selectedImage) return;

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };
  }, [selectedImage]);

  if (isLoading) {
    return (
      <div className="text-white flex justify-center items-center text-center w-full">
        <p className="text-base font-semibold">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      {selectedImage && (
        <div className="flex justify-center items-center mt-8 mb-8 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 z-50">
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white text-3xl bg-black p-2 rounded-full z-20"
          >
            x
          </button>
          <canvas
            id="canvas"
            width={500}
            height={500}
            className="border-2 border-[#27272a] max-w-full max-h-full"
          />
        </div>
      )}

      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-4">
          {images.map((image) => (
            <img
              key={image.id}
              src={`${config.baseUrl}/${image.path}`}
              alt="uploaded"
              className="w-52 h-52 object-cover rounded-md shadow-md cursor-pointer"
              onClick={() => setSelectedImage(`${config.baseUrl}/${image.path}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-white flex justify-center items-center text-center w-full">
          <p className="text-base font-semibold">There are no images.</p>
        </div>
      )}
    </div>
  );
};
