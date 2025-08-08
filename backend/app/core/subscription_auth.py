from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict

from app.services.subscription import get_subscription_by_owner
from app.models.subscription import Subscription
from .supabase_auth import get_current_user
from ..db import get_db


async def require_active_subscription(
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Subscription:
    """
    FastAPI dependency to validate user has an active subscription.
    
    Returns:
        Subscription object for the current user
        
    Raises:
        HTTPException 403: If no active subscription found
    """
    subscription = get_subscription_by_owner(db, user["id"])
    
    if not subscription or not subscription.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Active subscription required to access this feature"
        )
    
    return subscription