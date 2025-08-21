from typing import Dict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.chat_config import (
    ChatConfigCreate, 
    ChatConfigUpdate, 
    ChatConfigResponse,
    ChatWidgetConfigCreate,
    ChatWidgetConfigUpdate, 
    ChatWidgetConfigRead
)
from app.services.chat_config import (
    get_shop_by_owner,
    get_chat_config_by_shop,
    create_chat_config,
    update_chat_config
)
from app.models.chat_config import ChatWidgetConfig
from app.core.supabase_auth import get_current_user
from app.core.subscription_auth import require_active_subscription
from app.db import get_db

router = APIRouter(prefix="/chat-config", tags=["chat-config"])


@router.get("/", response_model=ChatConfigResponse)
async def get_chat_config(
    user: Dict[str, str] = Depends(get_current_user),
    subscription = Depends(require_active_subscription),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    chat_config = get_chat_config_by_shop(db, shop.id)
    if not chat_config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat config not found"
        )
    
    return chat_config


@router.post("/", response_model=ChatConfigResponse, status_code=status.HTTP_201_CREATED)
async def create_new_chat_config(
    config_data: ChatConfigCreate,
    user: Dict[str, str] = Depends(get_current_user),
    subscription = Depends(require_active_subscription),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    existing_config = get_chat_config_by_shop(db, shop.id)
    if existing_config:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Chat config already exists for this shop"
        )
    
    chat_config = create_chat_config(db, shop.id, config_data.user_context)
    return chat_config


@router.put("/", response_model=ChatConfigResponse)
async def update_existing_chat_config(
    config_data: ChatConfigUpdate,
    user: Dict[str, str] = Depends(get_current_user),
    subscription = Depends(require_active_subscription),
    db: Session = Depends(get_db)
):
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    chat_config = get_chat_config_by_shop(db, shop.id)
    if not chat_config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat config not found"
        )
    
    updated_config = update_chat_config(db, chat_config, config_data.user_context)
    return updated_config


# Widget Config Endpoints
@router.get("/widget-config", response_model=ChatWidgetConfigRead)
async def get_widget_config(
    user: Dict[str, str] = Depends(get_current_user),
    subscription = Depends(require_active_subscription),
    db: Session = Depends(get_db)
):

    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    widget_config = db.query(ChatWidgetConfig).filter(ChatWidgetConfig.shop_id == shop.id).first()
    if not widget_config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Widget config not found"
        )
    
    return widget_config


@router.post("/widget-config", response_model=ChatWidgetConfigRead, status_code=status.HTTP_201_CREATED)
async def create_widget_config(
    config_data: ChatWidgetConfigCreate,
    user: Dict[str, str] = Depends(get_current_user),
    subscription = Depends(require_active_subscription),
    db: Session = Depends(get_db)
):
    
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    existing_config = db.query(ChatWidgetConfig).filter(ChatWidgetConfig.shop_id == shop.id).first()
    if existing_config:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Widget config already exists for this shop"
        )
    
    widget_config = ChatWidgetConfig(
        shop_id=shop.id,
        **config_data.dict()
    )
    db.add(widget_config)
    db.commit()
    db.refresh(widget_config)
    return widget_config


@router.put("/widget-config", response_model=ChatWidgetConfigRead)
async def update_widget_config(
    config_data: ChatWidgetConfigUpdate,
    user: Dict[str, str] = Depends(get_current_user),
    subscription = Depends(require_active_subscription),
    db: Session = Depends(get_db)
):
    
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    widget_config = db.query(ChatWidgetConfig).filter(ChatWidgetConfig.shop_id == shop.id).first()
    if not widget_config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Widget config not found"
        )
    
    for field, value in config_data.dict().items():
        setattr(widget_config, field, value)
    
    db.commit()
    db.refresh(widget_config)
    return widget_config