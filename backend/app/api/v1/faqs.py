from uuid import UUID
from typing import List, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.faq import FAQCreate, FAQUpdate, FAQResponse
from app.services.faq import (
    get_shop_by_owner,
    get_faqs_by_shop,
    get_faq_by_id,
    create_faq,
    update_faq,
    delete_faq
)
from app.core.supabase_auth import get_current_user
from app.db import get_db

router = APIRouter(prefix="/faqs", tags=["faqs"])


@router.get("/", response_model=List[FAQResponse])
async def get_faqs(
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    faqs = get_faqs_by_shop(db, shop.id)
    return faqs


@router.post("/", response_model=FAQResponse, status_code=status.HTTP_201_CREATED)
async def create_new_faq(
    faq_data: FAQCreate,
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    faq = create_faq(db, faq_data.dict(), shop.id)
    return faq


@router.put("/{faq_id}", response_model=FAQResponse)
async def update_existing_faq(
    faq_id: UUID,
    faq_data: FAQUpdate,
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    faq = get_faq_by_id(db, faq_id, shop.id)
    if not faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="FAQ not found"
        )
    
    updated_faq = update_faq(db, faq, faq_data.dict())
    return updated_faq


@router.delete("/{faq_id}")
async def delete_existing_faq(
    faq_id: UUID,
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    faq = get_faq_by_id(db, faq_id, shop.id)
    if not faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="FAQ not found"
        )
    
    delete_faq(db, faq)
    return {"detail": "FAQ deleted successfully"}