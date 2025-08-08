from typing import Dict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.services.user import delete_user_account
from app.core.supabase_auth import get_current_user
from app.db import get_db

router = APIRouter(prefix="/users", tags=["users"])


@router.delete("/me")
async def delete_my_account(
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete current user account and all associated data"""
    try:
        await delete_user_account(db, user["id"])
        return {"detail": "Account deleted successfully"}
    except Exception as e:
        print(f"Account deletion error: {str(e)}")  # Add logging
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete account: {str(e)}"
        )