import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetcher } from '../service/fetcher';
import { ImagesCreateOutResponse } from '../types/images';

export const ImageUpload: React.FC = () => {
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newSelectedImages = Array.from(files);
      setSelectedImages((prevImages) => [...prevImages, ...newSelectedImages]);

      const newPreviews = newSelectedImages.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedImages.length > 0) {
      try {
        const formData = new FormData();
        selectedImages.forEach((file) => {
          formData.append('files', file);
        });
        const response = await fetcher<ImagesCreateOutResponse>('/images', {
          method: 'POST',
          body: formData,
        });
        toast.success(response.message);
        navigate('/all');
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-transparent w-full mt-10 text-white">
      <div className="bg-transparent rounded-2xl shadow-xl p-4 w-full max-w-xl flex flex-col items-center bg-black border-[#27272a] border-2 justify-center">
        <label className="w-full flex flex-col items-center justify-center p-2 rounded-lg shadow-md tracking-wide uppercase  bg-blue-500 cursor-pointer hover:bg-blue-700 transition">
          <span className="text-base leading-tight tracking-tight font-semibold">
            Select Images
          </span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`preview-${index}`}
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center text-red-500  text-3xl p-2 rounded-full z-20"
              >
                x
              </button>
            </div>
          ))}
        </div>
        {selectedImages.length > 0 && (
          <button
            onClick={handleUpload}
            className="mt-6 px-6 py-2 bg-blue-500 text-base leading-tight tracking-tight font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};
