from sqlalchemy import String, UUID
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from api.database.database import Base


class Image(Base):
    __tablename__ = "images"

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    path: Mapped[str] = mapped_column(String(255))
