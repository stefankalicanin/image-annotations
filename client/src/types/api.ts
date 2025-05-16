import { Annotations } from './annotations';

export interface ApiResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

export interface ImageCreateOut {
  id: string;
}

export interface ImagesCreateOut {
  ids: ImageCreateOut[];
}

export interface ImageGetOut {
  id: string;
  path: string;
}

export interface ImagesGetOut {
  images: ImageGetOut[];
}

export interface AnnotationsCreateOut {
  id: number;
}

export interface AnnotationsCreateIn {
  annotations: Annotations[];
}

export interface AnnotationsGetOut {
  annotations: Annotations[];
}

export type ImagesCreateOutResponse = ApiResponse<ImagesCreateOut>;

export type ImagesGetOutResponse = ApiResponse<ImagesGetOut>;

export type AnnotationsGetOutResponse = ApiResponse<AnnotationsGetOut>;

export type AnnotationsCreateOutResponse = ApiResponse<AnnotationsCreateOut>;
