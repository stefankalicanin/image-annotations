import { fetcher } from './fetcher';
import { AnnotationsGetOutResponse } from '../types/api';
import { AnnotationsCreateOutResponse } from '../types/api';
import { AnnotationsCreateIn } from '../types/api';

export const createAnnotations = async (
  imageId: string,
  payload: AnnotationsCreateIn,
): Promise<AnnotationsCreateOutResponse> => {
  return await fetcher<AnnotationsCreateOutResponse>(`/images/${imageId}/annotations`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const getAnnotations = async (imageId: string): Promise<AnnotationsGetOutResponse> => {
  return await fetcher<AnnotationsGetOutResponse>(`/images/${imageId}/annotations`, {
    method: 'GET',
  });
};
