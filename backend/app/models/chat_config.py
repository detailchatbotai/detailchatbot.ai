import uuid
from datetime import datetime
from sqlalchemy import Column, Text, DateTime, ForeignKey, UniqueConstraint, String, Boolean, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import enum

from ..db import Base


class WidgetPosition(str, enum.Enum):
    BOTTOM_LEFT = "bottom-left"
    BOTTOM_RIGHT = "bottom-right"


class WidgetTheme(str, enum.Enum):
    LIGHT = "light"
    DARK = "dark"


class ChatConfig(Base):
    __tablename__ = "chat_configs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    shop_id = Column(UUID(as_uuid=True), ForeignKey("shops.id"), nullable=False, unique=True)
    system_prompt = Column(Text, nullable=False)
    user_context = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        UniqueConstraint('shop_id', name='unique_shop_chat_config'),
    )


class ChatWidgetConfig(Base):
    __tablename__ = "chat_widget_configs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    shop_id = Column(UUID(as_uuid=True), ForeignKey("shops.id"), nullable=False, unique=True)
    position = Column(String(20), nullable=False, default="bottom-right")
    theme = Column(String(10), nullable=False, default="light")
    primary_color = Column(String(7), nullable=False, default="#3B82F6")
    greeting = Column(String(500), nullable=False, default="Hi! How can we help you with your services?")
    placeholder = Column(String(500), nullable=False, default="Ask about pricing, availability, or how we work...")
    show_branding = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        UniqueConstraint('shop_id', name='unique_shop_widget_config'),
    )