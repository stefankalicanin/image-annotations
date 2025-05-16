from typing import Annotated
from typing import List
from typing import Dict
from typing import Any
from typing import Optional
from typing import Union
from typing import Literal

from pydantic import BaseModel
from pydantic import Field

class Point(BaseModel):
    x:float
    y:float

class Box(BaseModel):
    type:Literal["box"]  
    x:float
    y:float
    w:float
    h:float

class Polygon(BaseModel):
    type:Literal["polygon"] 
    points:List[Point]

Annotation = Annotated[Union[Box,Polygon], Field(discriminator="type")]

class AnnotationCreateIn(BaseModel):
    annotations: List[Annotation]


class AnnotationCreateOut(BaseModel):
    id: int


class AnnotationGetOut(BaseModel):
    annotations: Optional[List[Annotation]]
