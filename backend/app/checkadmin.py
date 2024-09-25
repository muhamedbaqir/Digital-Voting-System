import jwt
from fastapi import HTTPException
from app.database import session
from cassandra.query import SimpleStatement

SECRET_KEY = "your_secret_key"  
ALGORITHM = "HS256"

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def check_admin(token):
    payload = decode_token(token)
    username = payload.get("username")
    if username is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    query = SimpleStatement("SELECT * FROM admins WHERE username = %s")
    result = session.execute(query, (username,)).one()
    if result is None:
        raise HTTPException(status_code=401, detail="User not found")
    return {"username": username, "message": "User is authenticated"}
