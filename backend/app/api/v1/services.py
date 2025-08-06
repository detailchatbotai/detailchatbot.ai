from uuid import UUID
from typing import List, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse
from app.services.service import (
    get_shop_by_owner,
    get_services_by_shop,
    get_service_by_id,
    create_service,
    update_service,
    delete_service
)
from app.core.supabase_auth import get_current_user
from app.db import get_db

router = APIRouter(prefix="/services", tags=["services"])


@router.get("/", response_model=List[ServiceResponse])
async def get_services(
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    services = get_services_by_shop(db, shop.id)
    return services


@router.post("/", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
async def create_new_service(
    service_data: ServiceCreate,
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    service = create_service(db, service_data.dict(), shop.id)
    return service


@router.put("/{service_id}", response_model=ServiceResponse)
async def update_existing_service(
    service_id: UUID,
    service_data: ServiceUpdate,
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    service = get_service_by_id(db, service_id, shop.id)
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    
    updated_service = update_service(db, service, service_data.dict())
    return updated_service


@router.delete("/{service_id}")
async def delete_existing_service(
    service_id: UUID,
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    service = get_service_by_id(db, service_id, shop.id)
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    
    delete_service(db, service)
    return {"detail": "Service deleted successfully"}