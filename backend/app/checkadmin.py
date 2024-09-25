import jwt, os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.database import session

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="admin/login")

def decode_access_token(access_token: str):
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token")

def get_current_user(access_token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(access_token)
    username = payload.get("username")
    if username is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token")
    return username

def  check_admin_permissions():
    return
'''
If login ist used
def check_admin_permissions(current_user: str = Depends(get_current_user)):
    query = "SELECT * FROM admins WHERE username = %s"
    result = session.execute(query, (current_user,)).one()
    if result is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
'''