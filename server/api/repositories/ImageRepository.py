from uuid import UUID
from typing import List

from fastapi import Depends

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession


from api.database.database import get_db
from api.models.ImageModel import Image


class ImageRepository:
    def __init__(self, db: AsyncSession = Depends(get_db)):
        self.db = db

    async def create(self, image: Image) -> UUID:
        try:
            self.db.add(image)
            await self.db.commit()
            await self.db.refresh(image)
            return image.id
        except SQLAlchemyError as e:
            await self.db.rollback()
            raise RuntimeError("Failed to save images.")

    async def get_images(self) -> List[Image]:
            response = await self.db.execute(select(Image))
            images = response.scalars().all()
            return images
       

    async def get_image_by_id(self, id: UUID) -> Image | None:
        image: Image | None = await self.db.get(Image, id)
        return image
