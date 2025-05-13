from typing import List
from typing import Dict
from typing import Any


from sqlalchemy import String
from sqlalchemy import UUID
from sqlalchemy import JSON
from sqlalchemy import Integer
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from api.database.database import Base


class Image(Base):
    __tablename__ = "images"

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    path: Mapped[str] = mapped_column(String(255), nullable=False)

    annotations: Mapped[List["Annotation"]] = relationship(
        back_populates="image", cascade="all, delete-orphan"
    )


class Annotation(Base):
    __tablename__ = "annotations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    image_id: Mapped[UUID] = mapped_column(ForeignKey("images.id"), nullable=False)
    data: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, nullable=False)

    image: Mapped["Image"] = relationship(back_populates="annotations")
