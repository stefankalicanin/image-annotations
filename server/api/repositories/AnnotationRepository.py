from fastapi import Depends

from sqlalchemy.ext.asyncio import AsyncSession

from api.database.database import get_db
from api.models.ImageModel import Annotation


class AnnotationRepository:
    def __init__(self, db: AsyncSession = Depends(get_db)):
        self.db = db

    async def create_annotation(self, annotation: Annotation) -> None:
        self.db.add(annotation)
        await self.db.commit()
