from pydantic import BaseModel

from uuid import UUID


class ImageCreateOut(BaseModel):
    id: UUID
