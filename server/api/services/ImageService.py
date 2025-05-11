import uuid

from pathlib import Path
from shutil import rmtree

from fastapi import Depends
from fastapi import UploadFile

from api.repositories.ImageRepository import ImageRepository
from api.models.ImageModel import Image
from api.config import BASE_UPLOAD_DIR


class ImageService:
    def __init__(self, repository: ImageRepository = Depends()):
        self.repository = repository

    async def upload_images(self, files: list[UploadFile]) -> str:

        # I commented this out for simplicity
        # if not file.filename.endswith((".jpg", ".png")):
        # raise RuntimeError("Invalid file type. Only .jpg and .png re allowed.")

        created_images_ids = []

        for file in files:
            image_id = uuid.uuid4()

            base_upload_dir = Path(BASE_UPLOAD_DIR)
            image_dir = base_upload_dir / str(image_id)
            image_dir.mkdir(parents=True, exist_ok=True)

            filename = file.filename
            path = image_dir / filename

            try:
                await self.save_image(file, path)
            except RuntimeError as e:
                if image_dir.exists():
                    rmtree(image_dir)
                raise e

            image = Image(id=image_id, path=str(path))

            try:
                created_image = await self.repository.create(image)
                created_images_ids.append(str(created_image.id))
            except RuntimeError as e:
                if image_dir.exists():
                    rmtree(image_dir)
                raise e

        return created_images_ids

    async def save_image(self, file: UploadFile, path: Path) -> None:
        try:
            with open(path, "wb") as out_file:
                content = await file.read()
                out_file.write(content)
        except Exception as e:
            raise RuntimeError("Failed to save file.")
