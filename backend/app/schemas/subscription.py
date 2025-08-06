from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class SubscriptionResponse(BaseModel):
    plan_name: str
    is_active: bool
    started_at: datetime
    canceled_at: Optional[datetime] = None

    class Config:
        from_attributes = True