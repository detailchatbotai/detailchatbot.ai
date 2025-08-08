from uuid import UUID
from typing import Optional
from sqlalchemy.orm import Session

from app.models.chat_config import ChatConfig
from app.models.shop import Shop


def get_shop_by_owner(db: Session, owner_id: UUID) -> Optional[Shop]:
    return db.query(Shop).filter(Shop.owner_id == owner_id).first()


def get_shop_by_id(db: Session, shop_id: UUID) -> Optional[Shop]:
    return db.query(Shop).filter(Shop.id == shop_id).first()


def get_chat_config_by_shop(db: Session, shop_id: UUID) -> Optional[ChatConfig]:
    return db.query(ChatConfig).filter(ChatConfig.shop_id == shop_id).first()


def create_chat_config(db: Session, shop_id: UUID, user_context: Optional[str] = None, system_prompt: str = None) -> ChatConfig:
    # Default system prompt for all businesses
    if not system_prompt:
        system_prompt = (
            "You are an enthusiastic and knowledgeable sales representative for a service business. "
            "Your goal is to help customers understand the value of our services and guide them toward booking. "
            "Be friendly, professional, and persuasive without being pushy. Highlight the benefits and quality of our work. "
            "When customers ask about services, explain what's included and why it's worth the investment. "
            "Always try to move the conversation toward scheduling or getting their contact information. "
            "Use phrases like 'I'd love to help you with that', 'This service would be perfect for you', and 'Would you like to schedule an appointment?' "
            "If you don't know something specific, offer to have someone call them back with details."
            "For peak performance, this is a auto detailing business, so you should be an expert in auto detailing services."
        )
    
    chat_config = ChatConfig(
        shop_id=shop_id,
        system_prompt=system_prompt,
        user_context=user_context
    )
    db.add(chat_config)
    db.commit()
    db.refresh(chat_config)
    return chat_config


def update_chat_config(db: Session, chat_config: ChatConfig, user_context: Optional[str]) -> ChatConfig:
    chat_config.user_context = user_context
    db.commit()
    db.refresh(chat_config)
    return chat_config


def build_full_context(db: Session, shop_id: UUID) -> str:
    """Build complete chatbot context from all shop data"""
    from app.models.service import Service
    from app.models.faq import FAQ
    
    chat_config = get_chat_config_by_shop(db, shop_id)
    if not chat_config:
        return ""
    
    # Get shop details
    shop = db.query(Shop).filter(Shop.id == shop_id).first()
    if not shop:
        return ""
    
    # Start with system prompt but customize it with shop name
    base_prompt = chat_config.system_prompt
    if shop.business_name:
        customized_prompt = base_prompt.replace(
            "a service business", 
            f"{shop.business_name}"
        ).replace(
            "the business",
            f"{shop.business_name}"
        )
    else:
        customized_prompt = base_prompt
    
    context_parts = [customized_prompt]
    
    # Add shop information
    shop_info = f"\nBusiness Information:\n"
    shop_info += f"Business Name: {shop.business_name}\n"
    if shop.description:
        shop_info += f"Description: {shop.description}\n"
    if shop.website:
        shop_info += f"Website: {shop.website}\n"
    if shop.email:
        shop_info += f"Email: {shop.email}\n"
    if shop.phone_number:
        shop_info += f"Phone: {shop.phone_number}\n"
    context_parts.append(shop_info)
    
    # Add user context if available
    if chat_config.user_context:
        context_parts.append(f"\nAdditional Business Context:\n{chat_config.user_context}")
    
    # Add services
    services = db.query(Service).filter(Service.shop_id == shop_id).all()
    if services:
        services_text = "\nServices We Offer:\n"
        for service in services:
            services_text += f"- {service.name}: ${service.price} ({service.duration_minutes} minutes)"
            if service.description:
                services_text += f" - {service.description}"
            services_text += "\n"
        context_parts.append(services_text)
    else:
        context_parts.append("\nNote: No specific services have been configured yet. Please ask the customer to contact us directly for service information.")
    
    # Add FAQs
    faqs = db.query(FAQ).filter(FAQ.shop_id == shop_id).all()
    if faqs:
        faqs_text = "\nFrequently Asked Questions:\n"
        for faq in faqs:
            faqs_text += f"Q: {faq.question}\nA: {faq.answer}\n\n"
        context_parts.append(faqs_text)
    
    return "\n".join(context_parts)