from uuid import UUID

from fastapi import Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from api.database.database import get_db
from api.models.ImageModel import Annotation


class AnnotationRepository:
    def __init__(self, db: AsyncSession = Depends(get_db)):
        self.db = db

    async def create_annotations(self, annotation: Annotation) -> int:
        self.db.add(annotation)
        await self.db.commit()
        await self.db.refresh(annotation)

        return annotation.id

    async def get_annotations(self, id: UUID) -> Annotation | None:
        result = await self.db.execute(
            select(Annotation).where(Annotation.image_id == id)
        )
        annotations = result.scalars().first()

        return annotations
