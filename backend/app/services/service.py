from uuid import UUID
from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.service import Service
from app.models.shop import Shop


def get_shop_by_owner(db: Session, owner_id: UUID) -> Optional[Shop]:
    return db.query(Shop).filter(Shop.owner_id == owner_id).first()


def get_services_by_shop(db: Session, shop_id: UUID) -> List[Service]:
    return db.query(Service).filter(Service.shop_id == shop_id).all()


def get_service_by_id(db: Session, service_id: UUID, shop_id: UUID) -> Optional[Service]:
    return db.query(Service).filter(
        Service.id == service_id, 
        Service.shop_id == shop_id
    ).first()


def create_service(db: Session, service_data: dict, shop_id: UUID) -> Service:
    service = Service(
        shop_id=shop_id,
        **service_data
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


def update_service(db: Session, service: Service, service_data: dict) -> Service:
    for field, value in service_data.items():
        setattr(service, field, value)
    
    db.commit()
    db.refresh(service)
    return service


def delete_service(db: Session, service: Service) -> None:
    db.delete(service)
    db.commit()