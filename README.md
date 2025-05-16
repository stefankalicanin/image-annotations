# Image Annotations

## Tech Stack

- **Backend:** Python, FastAPI  
- **Database:** PostgreSQL  
- **Migrations:** Alembic  
- **Frontend:** React, TypeScript  

## Test Images

- You can find test images at server/test-images

##  Getting Started (Docker)

### 1. Clone the repository
```bash
git clone https://github.com/stefankalicanin/image-annotations.git
```

### 2. Navigate to the project folder
```bash
cd image-annotations
```

### 3. Run with docker
```bash
docker compose -f docker-compose.dev.yaml up
```

### 4. Run the migrations
```bash
docker exec server alembic upgrade head
```



