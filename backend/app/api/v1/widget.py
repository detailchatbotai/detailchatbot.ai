from typing import Dict
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.schemas.widget import WidgetEmbedResponse
from app.services.widget import generate_embed_script
from app.services.service import get_shop_by_owner
from app.core.supabase_auth import get_current_user
from app.db import get_db

router = APIRouter(prefix="/widget", tags=["widget"])


@router.get("/embed", response_model=WidgetEmbedResponse)
async def get_widget_embed(
    format: str = Query(default="json", regex="^(json|html)$"),
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Generate embeddable widget script for the authenticated user's shop.
    
    Query params:
    - format: "json" (default) or "html" - response format
    """
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    embed_script = generate_embed_script(db, shop.id)
    
    return WidgetEmbedResponse(embed_script=embed_script)