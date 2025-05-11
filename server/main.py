from fastapi import FastAPI

from api.controllers.ImageController import images

app = FastAPI()

app.include_router(images)


@app.get("/")
async def root():
    return {"message": "Hello world"}
