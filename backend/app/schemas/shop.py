from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ShopBase(BaseModel):
    business_name: str
    website: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    description: Optional[str] = None


class ShopCreate(ShopBase):
    pass


class ShopResponse(ShopBase):
    id: UUID
    owner_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True