from typing import List
from typing import Dict
from typing import Any
from typing import Optional

from pydantic import BaseModel


class AnnotationCreateIn(BaseModel):
    annotations: List[Dict[str, Any]]


class AnnotationCreateOut(BaseModel):
    id: int


class AnnotationGetOut(BaseModel):
    annotations: Optional[List[Dict[str, Any]]]
