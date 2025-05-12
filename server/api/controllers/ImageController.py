from typing import List

from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import HTTPException
from fastapi.responses import JSONResponse

from api.services.ImageService import ImageService
from api.schemas.BaseResponse import BaseResponse
from api.schemas.ImageSchema import ImageCreateOut

images = APIRouter(prefix="/images")


@images.post(
    "", summary="Upload an image.", response_model=BaseResponse[List[ImageCreateOut]]
)
async def upload_images(files: List[UploadFile], service: ImageService = Depends()):
    try:
        created_images_ids: List[ImageCreateOut] = await service.upload_images(files)
        return BaseResponse(
            status_code=201,
            message="Images successfully created.",
            data=created_images_ids,
        )
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occured.")
