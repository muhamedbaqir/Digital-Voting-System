from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.database import session
from cassandra.query import SimpleStatement
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from typing import Union
from uuid import uuid4
import os

router = APIRouter(tags=["Admin"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_schema = OAuth2PasswordBearer(tokenUrl="login")

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
ALGORITHM = os.getenv("ALGORITHM")
SECRET_KEY = os.getenv("SECRET_KEY")

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

@router.delete("/clear_tables")
async def clear_tables():
    try:
        tables_to_clear = ['candidates', 'constituencies', 'constituency_parties', 'parties', 'votes']
        for table in tables_to_clear:
            query = f"TRUNCATE {table};"
            session.execute(SimpleStatement(query))

        return {"message": "All tables cleared"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/register", description="Register a new admin by providing a username and password. The password is securely hashed before being stored. Returns a success message upon successful creation.")
def register_admin(admin: OAuth2PasswordRequestForm = Depends()):
    existing_query = SimpleStatement("SELECT * FROM admins WHERE username = %s")
    existing_admin = session.execute(existing_query, (admin.username,)).one()
    
    if existing_admin is not None:
        raise HTTPException(status_code=400, detail="Username already exists")

    admin_id = uuid4()
    password_hash = get_password_hash(admin.password)
    
    query = SimpleStatement("""
        INSERT INTO admins (admin_id, username, password_hash)
        VALUES (%s, %s, %s)
    """)
    session.execute(query, (admin_id, admin.username, password_hash))
    
    return {"message": "Admin created successfully"}

@router.post("/login", description="Authenticate an admin by verifying their username and password. Returns an access token if the credentials are valid, otherwise raises an error for invalid credentials.")
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

