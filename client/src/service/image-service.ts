import { fetcher } from './fetcher';
import { ImagesCreateOutResponse } from '../types/api';
import { ImagesGetOutResponse } from '../types/api';

export const uploadImages = async (formData: FormData) => {
  return await fetcher<ImagesCreateOutResponse>('/images', {
    method: 'POST',
    body: formData,
  });
};

export const getImages = async () => {
  return await fetcher<ImagesGetOutResponse>('/images', {
    method: 'GET',
  });
};
