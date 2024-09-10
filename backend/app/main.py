from fastapi import FastAPI, Depends
from app.database import session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.routers.candidates import router as candidates_router
from app.routers.constituencies import router as constituencies_router
from app.routers.elections import router as elections_router
from app.routers.voters import router as voters_router
from app.routers.votes import router as votes_router
from app.routers.admin import router as admin_router

app = FastAPI()
app.include_router(candidates_router, prefix="/candidates")
app.include_router(constituencies_router, prefix="/constituencies")
app.include_router(elections_router, prefix="/elections")
app.include_router(voters_router, prefix="/voters")
app.include_router(votes_router, prefix="/votes")
app.include_router(admin_router, prefix="/admin")


@app.get("/")
def read_home():
    return {"message": "Hello!"}

@app.get("/data")
def get_data():
    rows = session.execute("SELECT * FROM voters")
    return {"data": [row for row in rows]}
'''
@app.post("/login")
def login(user: OAuth2PasswordRequestForm = Depends()):
    return login(sessin,user)
    '''