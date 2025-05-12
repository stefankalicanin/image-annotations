import { ImageUpload } from '../components/image-upload';

export const Upload = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full text-center text-white">
      <h1 className="sm:text-6xl text-5xl  font-bold tracking-tight leading-tight">
        Upload Images
      </h1>
      <ImageUpload />
    </div>
  );
};
