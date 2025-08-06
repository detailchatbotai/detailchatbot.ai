from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict

from app.models.shop import Shop
from app.schemas.shop import ShopCreate, ShopResponse
from app.core.supabase_auth import get_current_user
from app.db import get_db

router = APIRouter(prefix="/shops", tags=["shops"])


@router.post("/", response_model=ShopResponse, status_code=status.HTTP_201_CREATED)
async def create_shop(
    shop_data: ShopCreate,
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    existing_shop = db.query(Shop).filter(Shop.owner_id == user["id"]).first()
    if existing_shop:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already has a shop"
        )
    
    shop = Shop(
        owner_id=user["id"],
        **shop_data.dict()
    )
    db.add(shop)
    db.commit()
    db.refresh(shop)
    return shop


@router.get("/me", response_model=ShopResponse)
async def get_my_shop(
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = db.query(Shop).filter(Shop.owner_id == user["id"]).first()
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    return shop


@router.put("/me", response_model=ShopResponse)
async def update_my_shop(
    shop_data: ShopCreate,
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = db.query(Shop).filter(Shop.owner_id == user["id"]).first()
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    for field, value in shop_data.dict().items():
        setattr(shop, field, value)
    
    db.commit()
    db.refresh(shop)
    return shop


@router.delete("/me")
async def delete_my_shop(
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = db.query(Shop).filter(Shop.owner_id == user["id"]).first()
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    db.delete(shop)
    db.commit()
    return {"detail": "Deleted successfully"}