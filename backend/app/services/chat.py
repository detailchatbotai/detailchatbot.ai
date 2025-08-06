from openai import AsyncOpenAI
from uuid import UUID
from typing import List, Dict
from sqlalchemy.orm import Session

from app.models.shop import Shop
from app.services.chat_config import get_shop_by_owner, build_full_context
from app.core.config import settings

# Initialize OpenAI client
client = AsyncOpenAI(api_key=settings.openai_api_key)


async def generate_chat_response(
    db: Session, 
    shop: Shop, 
    messages: List[Dict[str, str]]
) -> str:
    """Generate AI response using OpenAI ChatCompletion"""
    
    try:
        # Use existing build_full_context function from chat_config service
        system_context = build_full_context(db, shop.id)
        
        if not system_context:
            raise Exception("No chat configuration found for shop")
        
        # Prepare messages for OpenAI
        openai_messages = [
            {"role": "system", "content": system_context}
        ]
        
        # Add user messages
        openai_messages.extend(messages)
        
        # Call OpenAI API using new v1.0+ syntax
        response = await client.chat.completions.create(
            model="gpt-4",
            messages=openai_messages,
            temperature=0.7,
            max_tokens=500
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        raise Exception(f"OpenAI API error: {str(e)}")