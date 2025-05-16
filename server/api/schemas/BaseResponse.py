from typing import Generic, TypeVar, Optional

from pydantic.generics import GenericModel

T = TypeVar("T")


class BaseResponse(GenericModel, Generic[T]):
    status_code: int
    message: str
    data: Optional[T] = None
