from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import HTTPException
from fastapi import status
from fastapi.responses import JSONResponse

from api.services.ImageService import ImageService

images = APIRouter(prefix="/images")


@images.post("", summary="Upload an image.")
async def upload_images(
    files: list[UploadFile], service: ImageService = Depends()
) -> JSONResponse:
    try:
        created_images_ids = await service.upload_images(files)
        return JSONResponse(
            content={
                "image_ids": created_images_ids,
                "message": "Image is uploaded successfully.",
            },
            status_code=status.HTTP_201_CREATED,
        )
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occured.")
