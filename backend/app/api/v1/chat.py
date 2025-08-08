from typing import Dict
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat import generate_chat_response
from app.services.chat_config import get_shop_by_owner, get_shop_by_id
from app.core.supabase_auth import get_current_user
from app.db import get_db

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
async def chat_completion(
    chat_request: ChatRequest,
    user: Dict[str, str] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Generate AI chatbot response for the authenticated user's shop.
    
    Takes a list of chat messages and returns an AI-generated response
    using the shop's context (services, FAQs, chat config).
    """
    # Get user's shop
    shop = get_shop_by_owner(db, user["id"])
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    # Convert Pydantic messages to dict format for OpenAI
    messages = [
        {"role": msg.role, "content": msg.content} 
        for msg in chat_request.messages
    ]
    
    try:
        # Generate AI response
        reply = await generate_chat_response(db, shop, messages)
        return ChatResponse(reply=reply)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate response: {str(e)}"
        )


@router.post("/{shop_id}/public", response_model=ChatResponse)
async def public_chat_completion(
    shop_id: UUID,
    chat_request: ChatRequest,
    db: Session = Depends(get_db)
):
    """
    Generate AI chatbot response for anonymous customers using shop's widget.
    
    Takes a shop ID and chat messages, returns AI response using the shop's
    context (services, FAQs, chat config). No authentication required.
    """
    # Get shop by ID
    shop = get_shop_by_id(db, shop_id)
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    # Convert Pydantic messages to dict format for OpenAI
    messages = [
        {"role": msg.role, "content": msg.content} 
        for msg in chat_request.messages
    ]
    
    try:
        # Generate AI response
        reply = await generate_chat_response(db, shop, messages)
        return ChatResponse(reply=reply)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate response: {str(e)}"
        )