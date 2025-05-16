# Image Annotations

## Tech Stack

- **Backend:** Python, FastAPI  
- **Database:** PostgreSQL  
- **Migrations:** Alembic  
- **Frontend:** React, TypeScript  

##  Getting Started (Docker)

### Clone the repository
```bash
git clone https://github.com/stefankalicanin/image-annotations.git
```

### Navigate to the project folder
```bash
cd image-annotations
```

### Run with docker
```bash
docker compose -f docker-compose.dev.yaml up
```

### Run the migrations
```bash
docker exec server alembic upgrade head
```

### Access the app
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8000
- **Api docs:** http://localhost:8000/docs

## Testing

A set of test images is available in the `server/test-images/` directory.

To test:

1. Open the frontend in your browser.  
2. Upload a test images from the `test-folder/`.  
3. Draw boxes or polygons on the image.  
4. Export the annotations – data is sent to the backend and stored in the database.  
5. Open image to view previously saved annotations.  
6. Previously saved annotations can be downloaded as a JSON file.  


