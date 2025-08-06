from uuid import UUID
from datetime import datetime
from pydantic import BaseModel


class FAQBase(BaseModel):
    question: str
    answer: str


class FAQCreate(FAQBase):
    pass


class FAQUpdate(FAQBase):
    pass


class FAQResponse(FAQBase):
    id: UUID
    shop_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True