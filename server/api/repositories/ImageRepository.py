from uuid import UUID

from fastapi import Depends

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from api.database.database import get_db
from api.models.ImageModel import Image


class ImageRepository:
    def __init__(self, db: Session = Depends(get_db)):
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
