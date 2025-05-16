from uuid import UUID

from fastapi import Depends

from api.repositories.AnnotationRepository import AnnotationRepository
from api.services.ImageService import ImageService
from api.exceptions.CustomException import NotFoundException
from api.schemas.AnnotationSchema import AnnotationCreateIn
from api.schemas.AnnotationSchema import AnnotationGetOut
from api.schemas.AnnotationSchema import AnnotationCreateOut
from api.models.ImageModel import Annotation


class AnnotationService:
    def __init__(
        self,
        image_service: ImageService = Depends(),
        repository: AnnotationRepository = Depends(),
    ):
        self.image_service = image_service
        self.repository = repository

    async def create_annotations(
        self, id: UUID, anotation: AnnotationCreateIn
    ) -> AnnotationCreateOut:
        try:
            await self.image_service.get_image_by_id(id)

            annotations: Annotation = Annotation(
                image_id=id, data=anotation.annotations
            )
            created_annotation_id = await self.repository.create_annotations(
                annotations
            )

            return AnnotationCreateOut(id=created_annotation_id)
        except NotFoundException as e:
            raise e

    async def get_annotations(self, id: UUID) -> AnnotationGetOut:
        try:
            await self.image_service.get_image_by_id(id)
            annotations: Annotation = await self.repository.get_annotations(id)
            return (
                AnnotationGetOut(annotations=annotations.data)
                if annotations
                else AnnotationGetOut(annotations=[])
            )
        except NotFoundException as e:
            raise
