from uuid import UUID
from io import BytesIO
import json

from fastapi import Depends
from fastapi.responses import StreamingResponse


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
        self, id: UUID, annotations: AnnotationCreateIn
    ) -> AnnotationCreateOut:
        try:
            await self.image_service.get_image_by_id(id)

            serialized_annotations = [a.dict() for a in annotations.annotations]
            annotations: Annotation = Annotation(
                image_id=id, data=serialized_annotations
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

    async def download_annotations(self, id: UUID) -> StreamingResponse:
        try:
            annotations_data_out = await self.get_annotations(id)
            annotations = annotations_data_out.annotations

            json_bytes = json.dumps(annotations, indent=2).encode("utf-8")
            buffer = BytesIO(json_bytes)

            return StreamingResponse(
                buffer,
                media_type="application/json",
                headers={
                    "Content-Disposition": f"attachment; filename=annotations_{id}.json"
                },
            )
        except NotFoundException as e:
            raise e
