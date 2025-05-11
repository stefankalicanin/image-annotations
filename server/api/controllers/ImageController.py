from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import HTTPException
from fastapi import status
from fastapi.responses import JSONResponse

from api.services.ImageService import ImageService

images = APIRouter(prefix="/images")


@images.post("", summary="Upload an image.")
async def upload_image(
    file: UploadFile, service: ImageService = Depends()
) -> JSONResponse:
    try:
        created_image_id = await service.upload_image(file)
        return JSONResponse(
            content={
                "image_id": created_image_id,
                "message": "Image is uploaded successfully.",
            },
            status_code=status.HTTP_201_CREATED,
        )
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occured.")
