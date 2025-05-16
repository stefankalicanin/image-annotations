import React from 'react';

import { toast } from 'react-toastify';

import { ImageCanvas } from './image-canvas';
import { Loading } from './loading';
import { getImages } from '../service/image-service';
import { config } from '../config/config';
import { ImageGetOut } from '../types/api';

export const Images: React.FC = () => {
  const [images, setImages] = React.useState<ImageGetOut[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<ImageGetOut | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const fetchImages = async () => {
    try {
      const response = await getImages();
      setImages(response.data.images);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchImages();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (selectedImage) {
    return (
      <ImageCanvas
        imageUrl={selectedImage.path}
        imageId={selectedImage.id}
        close={() => setSelectedImage(null)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center">
      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-4">
          {images.map((image) => (
            <img
              key={image.id}
              src={`${config.baseUrl}/${image.path}`}
              alt="uploaded"
              className="w-60 h-60 object-cover rounded-md shadow-md cursor-pointer border-4 border-[#27272a]"
              onClick={() => {
                setSelectedImage(image);
              }}
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
