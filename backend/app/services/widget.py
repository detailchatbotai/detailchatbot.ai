from uuid import UUID
from sqlalchemy.orm import Session
from typing import Optional

from app.models.chat_config import ChatWidgetConfig
from app.core.config import settings


def get_or_create_widget_config(db: Session, shop_id: UUID) -> ChatWidgetConfig:
    """Get existing widget config or create default one"""
    widget_config = db.query(ChatWidgetConfig).filter(ChatWidgetConfig.shop_id == shop_id).first()
    
    if not widget_config:
        # Create default config
        widget_config = ChatWidgetConfig(shop_id=shop_id)
        db.add(widget_config)
        db.commit()
        db.refresh(widget_config)
    
    return widget_config


def generate_embed_script(db: Session, shop_id: UUID) -> str:
    """
    Generate embeddable widget script for a shop using stored configuration.
    Auto-creates default config if none exists.
    """
    widget_config = get_or_create_widget_config(db, shop_id)
    
    script = f'''<!-- Chatbot.ai Widget -->
<script>
  window.ChatbotAiConfig = {{
    shopId: "{shop_id}",
    position: "{widget_config.position}",
    theme: "{widget_config.theme}",
    primaryColor: "{widget_config.primary_color}",
    greeting: "{widget_config.greeting}",
    placeholder: "{widget_config.placeholder}",
    showBranding: {str(widget_config.show_branding).lower()}
  }};
</script>
<script src="{settings.backend_url}/api/v1/widget/widget.js" async></script>
<!-- End Chatbot.ai Widget -->'''
    
    return script