from typing import List
from typing import Dict
from typing import Any
from uuid import UUID

from pydantic import BaseModel


class ImageCreateOut(BaseModel):
    id: UUID


class ImagesCreateOut(BaseModel):
    ids: List[ImageCreateOut]


class ImageGetOut(BaseModel):
    id: UUID
    path: str


class ImagesGetOut(BaseModel):
    images: List[ImageGetOut]


class AnnotationCreateIn(BaseModel):
    annotation: List[Dict[str, Any]]
