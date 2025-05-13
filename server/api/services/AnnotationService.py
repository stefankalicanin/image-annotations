from uuid import UUID

from fastapi import Depends

from api.repositories.AnnotationRepository import AnnotationRepository
from api.services.ImageService import ImageService
from api.exceptions.CustomException import NotFoundException
from api.schemas.ImageSchema import AnnotationCreateIn
from api.schemas.ImageSchema import AnnotationGetOut
from api.models.ImageModel import Annotation


class AnnotationService:
    def __init__(
        self,
        image_service: ImageService = Depends(),
        repository: AnnotationRepository = Depends(),
    ):
        self.image_service = image_service
        self.repository = repository

    async def create_annotation(self, id: UUID, anotation: AnnotationCreateIn) -> None:
        try:
            await self.image_service.get_image_by_id(id)

            annotation: Annotation = Annotation(image_id=id, data=anotation.annotation)
            await self.repository.create_annotation(annotation)
        except NotFoundException as e:
            raise e

    async def get_annotation(self, id: UUID) -> AnnotationGetOut:
        try:
            await self.image_service.get_image_by_id(id)
            annotation: Annotation = await self.repository.get_annotation(id)
            return (
                AnnotationGetOut(annotation=annotation.data)
                if annotation
                else AnnotationGetOut(annotation=None)
            )
        except NotFoundException as e:
            raise
