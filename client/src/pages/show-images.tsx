import { Images } from '../components/images';

export const ShowImages = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-20">
      <div className="flex flex-col justify-center items-center w-full text-white text-center">
        <h1 className="sm:text-6xl text-5xl  font-bold tracking-tight leading-tight">All Images</h1>
        <h2 className="sm:text-2xl text-xl text-[#b0b0b7] font-semibold tracking-tight leading-tight">
          Choose for annotate
        </h2>
      </div>
      <Images />
    </div>
  );
};
