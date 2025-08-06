from uuid import UUID
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from app.models.subscription import Subscription


def get_subscription_by_owner(db: Session, owner_id: UUID) -> Subscription | None:
    return db.query(Subscription).filter(Subscription.owner_id == owner_id).first()


def create_free_subscription(db: Session, owner_id: UUID) -> Subscription:
    subscription = Subscription(
        owner_id=owner_id,
        plan_name="free"
    )
    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    return subscription


def cancel_subscription(db: Session, owner_id: UUID) -> Subscription | None:
    subscription = db.query(Subscription).filter(Subscription.owner_id == owner_id).first()
    if subscription:
        subscription.is_active = False
        subscription.canceled_at = func.now()
        db.commit()
        db.refresh(subscription)
    return subscription