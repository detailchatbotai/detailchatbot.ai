from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict

from app.schemas.subscription import SubscriptionResponse
from app.services.subscription import (
    get_subscription_by_owner,
    create_free_subscription,
    cancel_subscription
)
from app.core.supabase_auth import get_current_user
from app.db import get_db

router = APIRouter()


@router.get("/me", response_model=SubscriptionResponse)
async def get_my_subscription(
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    subscription = get_subscription_by_owner(db, user["id"])
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription not found"
        )
    return subscription


@router.post("/activate-free", response_model=SubscriptionResponse, status_code=status.HTTP_201_CREATED)
async def activate_free_plan(
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    existing_subscription = get_subscription_by_owner(db, user["id"])
    if existing_subscription:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already has a subscription"
        )
    
    subscription = create_free_subscription(db, user["id"])
    return subscription


@router.post("/cancel", response_model=SubscriptionResponse)
async def cancel_my_subscription(
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    subscription = cancel_subscription(db, user["id"])
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription not found"
        )
    return subscription