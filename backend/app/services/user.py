import httpx
from sqlalchemy.orm import Session

from app.models.shop import Shop
from app.models.subscription import Subscription
from app.models.service import Service
from app.models.faq import FAQ
from app.models.chat_config import ChatConfig, ChatWidgetConfig
from app.core.config import settings


async def delete_user_account(db: Session, user_id: str):
    """Delete user account and all associated data"""
    # Get user's shop
    shop = db.query(Shop).filter(Shop.owner_id == user_id).first()
    
    if shop:
        # Delete related data first (avoid foreign key constraints)
        db.query(Service).filter(Service.shop_id == shop.id).delete()
        db.query(FAQ).filter(FAQ.shop_id == shop.id).delete()
        db.query(ChatConfig).filter(ChatConfig.shop_id == shop.id).delete()
        db.query(ChatWidgetConfig).filter(ChatWidgetConfig.shop_id == shop.id).delete()
        
        # Delete shop
        db.delete(shop)
    
    # Delete subscription
    subscription = db.query(Subscription).filter(Subscription.owner_id == user_id).first()
    if subscription:
        db.delete(subscription)
    
    # Commit database changes
    db.commit()
    
    # Try to delete from Supabase (optional - main data is already cleaned up)
    try:
        async with httpx.AsyncClient() as client:
            response = await client.delete(
                f"{settings.supabase_project_url}/auth/v1/admin/users/{user_id}",
                headers={
                    "Authorization": f"Bearer {settings.supabase_service_role_key}",
                    "apikey": settings.supabase_service_role_key
                }
            )
            
            if response.status_code not in [200, 204]:
                print(f"Warning: Failed to delete user from Supabase: {response.status_code}")
    except Exception as e:
        print(f"Warning: Supabase deletion failed: {str(e)}")
        # Don't fail the entire operation if Supabase deletion fails