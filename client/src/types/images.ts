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

export type ImagesCreateOutResponse = ApiResponse<ImagesCreateOut>;

export type ImagesGetOutResponse = ApiResponse<ImagesGetOut>;
