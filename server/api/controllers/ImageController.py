from typing import List
from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import HTTPException
from fastapi.responses import StreamingResponse

from api.services.ImageService import ImageService
from api.services.AnnotationService import AnnotationService
from api.schemas.BaseResponse import BaseResponse
from api.schemas.ImageSchema import ImagesCreateOut
from api.schemas.ImageSchema import ImagesGetOut
from api.schemas.AnnotationSchema import AnnotationCreateIn
from api.schemas.AnnotationSchema import AnnotationGetOut
from api.schemas.AnnotationSchema import AnnotationCreateOut
from api.exceptions.CustomException import NotFoundException

images = APIRouter(prefix="/images")


@images.post(
    "", summary="Upload an image.", response_model=BaseResponse[ImagesCreateOut]
)
async def upload_images(files: List[UploadFile], service: ImageService = Depends()):
    try:
        created_images_ids: ImagesCreateOut = await service.upload_images(files)
        return BaseResponse(
            status_code=201,
            message="Images successfully created.",
            data=created_images_ids,
        )
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occured.{e}")


@images.get("", summary="Get all images.", response_model=BaseResponse[ImagesGetOut])
async def get_images(service: ImageService = Depends()):
    try:
        images: ImagesGetOut = await service.get_images()
        return BaseResponse(
            status_code=200, message="Images successfully retrieved.", data=images
        )
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occured.")


@images.post(
    "/{id}/annotations",
    summary="Create annotation.",
    response_model=BaseResponse[AnnotationCreateOut],
)
async def create_annotation(
    id: UUID,
    anotations: AnnotationCreateIn,
    annotation_service: AnnotationService = Depends(),
):
    try:
        
        created_annotations_id = await annotation_service.create_annotations(
            id, anotations
        )
        return BaseResponse(
            status_code=201,
            message="Annotation successfully created.",
            data=created_annotations_id,
        )
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))


@images.get(
    "/{id}/annotations",
    summary="Get annotation.",
    response_model=BaseResponse[AnnotationGetOut],
)
async def get_annotation(
    id: UUID,
    annotation_service: AnnotationService = Depends(),
):
    try:
        annotations: AnnotationGetOut = await annotation_service.get_annotations(id)
        return BaseResponse(
            status_code=200,
            message="Annotation successfully retrieved.",
            data=annotations,
        )
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))


@images.get(
    "/{id}/download-annotations",
    summary="Download annotations.",
    response_class=StreamingResponse,
)
async def download_annotations(
    id: UUID, annotation_service: AnnotationService = Depends()
):
    try:
        return await annotation_service.download_annotations(id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
