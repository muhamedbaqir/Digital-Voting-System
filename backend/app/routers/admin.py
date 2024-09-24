from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.database import session
from cassandra.query import SimpleStatement
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from typing import Union
from uuid import uuid4

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_schema = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/register/")
def register_admin(admin: OAuth2PasswordRequestForm = Depends()):
    admin_id = uuid4()
    password_hash = get_password_hash(admin.password)
    query = SimpleStatement("""
        INSERT INTO admins (admin_id, username, password_hash, created_at)
        VALUES (%s, %s, %s, %s)
    """)
    session.execute(query, (admin_id, admin.username, password_hash, datetime.utcnow()))
    return {"message": "Admin created successfully"}

@router.post("/login/")
def login(admin: OAuth2PasswordRequestForm = Depends()):
    query = SimpleStatement("SELECT * FROM admins WHERE username = %s")
    result = session.execute(query, (admin.username,)).one()
    
    if result is None or not verify_password(admin.password, result.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": result.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
