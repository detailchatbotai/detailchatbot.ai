from uuid import UUID
from datetime import datetime
from typing import Optional, Literal
from pydantic import BaseModel


class ChatConfigBase(BaseModel):
    user_context: Optional[str] = None


class ChatConfigCreate(ChatConfigBase):
    pass


class ChatConfigUpdate(ChatConfigBase):
    pass


class ChatConfigResponse(ChatConfigBase):
    id: UUID
    shop_id: UUID
    system_prompt: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ChatWidgetConfigBase(BaseModel):
    position: Literal["bottom-left", "bottom-right"] = "bottom-right"
    theme: Literal["light", "dark"] = "light"
    primary_color: str = "#3B82F6"
    greeting: str = "Hi! How can we help you with your services?"
    placeholder: str = "Ask about pricing, availability, or how we work..."
    show_branding: bool = True


class ChatWidgetConfigCreate(ChatWidgetConfigBase):
    pass


class ChatWidgetConfigUpdate(ChatWidgetConfigBase):
    pass


class ChatWidgetConfigRead(ChatWidgetConfigBase):
    id: UUID
    shop_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True