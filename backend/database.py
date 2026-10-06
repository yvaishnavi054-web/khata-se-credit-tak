from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, Date, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    mobile = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String)
    
    profile = relationship("BusinessProfile", back_populates="user", uselist=False)
    transactions = relationship("Transaction", back_populates="user")

class BusinessProfile(Base):
    __tablename__ = "business_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    business_name = Column(String)
    business_type = Column(String)
    language = Column(String)
    location = Column(String)
    start_date = Column(Date)
    
    user = relationship("User", back_populates="profile")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(String) # 'sale', 'expense', 'income'
    category = Column(String, nullable=True)
    description = Column(String, nullable=True)
    quantity = Column(Integer, nullable=True)
    unit_price = Column(Float, nullable=True)
    amount = Column(Float)
    transaction_date = Column(Date, default=datetime.date.today)
    source = Column(String) # 'voice', 'manual', 'demo'
    raw_transcript = Column(String, nullable=True)
    confirmed = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="transactions")

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
