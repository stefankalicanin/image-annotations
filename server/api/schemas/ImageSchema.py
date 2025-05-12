from typing import List
from uuid import UUID

from pydantic import BaseModel


class ImageCreateOut(BaseModel):
    id: UUID


class ImageGetOut(BaseModel):
    id: UUID
    path: str


class ImagesGetOut(BaseModel):
    images: List[ImageGetOut]
