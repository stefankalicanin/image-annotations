from typing import List
from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import HTTPException

from api.services.ImageService import ImageService
from api.services.AnnotationService import AnnotationService
from api.schemas.BaseResponse import BaseResponse
from api.schemas.ImageSchema import ImagesCreateOut
from api.schemas.ImageSchema import ImagesGetOut
from api.schemas.ImageSchema import AnnotationCreateIn
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
    "/{id}/annotations", summary="Create annotation.", response_model=BaseResponse
)
async def create_annotation(
    id: UUID,
    anotation: AnnotationCreateIn,
    annotation_service: AnnotationService = Depends(),
):
    try:
        await annotation_service.create_annotation(id, anotation)
        return BaseResponse(
            status_code=201, message="Annotation successfully created.", data=None
        )
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
