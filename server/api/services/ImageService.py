from uuid import UUID
from uuid import uuid4
from typing import List
from pathlib import Path
from shutil import rmtree

from fastapi import Depends
from fastapi import UploadFile

from api.repositories.ImageRepository import ImageRepository
from api.models.ImageModel import Image
from api.schemas.ImageSchema import ImageCreateOut
from api.schemas.ImageSchema import ImageGetOut
from api.schemas.ImageSchema import ImagesGetOut
from api.config import BASE_UPLOAD_DIR


class ImageService:
    def __init__(self, repository: ImageRepository = Depends()):
        self.repository = repository

    async def upload_images(self, files: List[UploadFile]) -> List[ImageCreateOut]:

        # I commented this out for simplicity
        # if not file.filename.endswith((".jpg", ".png")):
        # raise RuntimeError("Invalid file type. Only .jpg and .png re allowed.")

        created_images_ids: List[ImageCreateOut] = []

        for file in files:
            image_id: UUID = uuid4()

            base_upload_dir: Path = Path(BASE_UPLOAD_DIR)
            image_dir: Path = base_upload_dir / str(image_id)
            image_dir.mkdir(parents=True, exist_ok=True)

            filename: str = file.filename
            path: Path = image_dir / filename

            try:
                await self.save_image(file, path)
            except RuntimeError as e:
                if image_dir.exists():
                    rmtree(image_dir)
                raise e

            image: Image = Image(id=image_id, path=str(path))

            try:
                created_image_id: UUID = await self.repository.create(image)
                created_images_ids.append(ImageCreateOut(id=created_image_id))
            except RuntimeError as e:
                if image_dir.exists():
                    rmtree(image_dir)
                raise e
        return created_images_ids

    async def save_image(self, file: UploadFile, path: Path) -> int:
        try:
            with open(path, "wb") as out_file:
                content = await file.read()
                out_file.write(content)
        except Exception as e:
            raise RuntimeError("Failed to save images.")

    async def get_images(self) -> ImagesGetOut:
        try:
            images: List[Image] = await self.repository.get_images()
            return ImagesGetOut(
                images=[ImageGetOut(id=image.id, path=image.path) for image in images]
            )
        except RuntimeError as e:
            raise e
