from uuid import UUID
from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.faq import FAQ
from app.models.shop import Shop


def get_shop_by_owner(db: Session, owner_id: UUID) -> Optional[Shop]:
    return db.query(Shop).filter(Shop.owner_id == owner_id).first()


def get_faqs_by_shop(db: Session, shop_id: UUID) -> List[FAQ]:
    return db.query(FAQ).filter(FAQ.shop_id == shop_id).all()


def get_faq_by_id(db: Session, faq_id: UUID, shop_id: UUID) -> Optional[FAQ]:
    return db.query(FAQ).filter(
        FAQ.id == faq_id, 
        FAQ.shop_id == shop_id
    ).first()


def create_faq(db: Session, faq_data: dict, shop_id: UUID) -> FAQ:
    faq = FAQ(
        shop_id=shop_id,
        **faq_data
    )
    db.add(faq)
    db.commit()
    db.refresh(faq)
    return faq


def update_faq(db: Session, faq: FAQ, faq_data: dict) -> FAQ:
    for field, value in faq_data.items():
        setattr(faq, field, value)
    
    db.commit()
    db.refresh(faq)
    return faq


def delete_faq(db: Session, faq: FAQ) -> None:
    db.delete(faq)
    db.commit()