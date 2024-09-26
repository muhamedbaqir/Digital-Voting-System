from fastapi import FastAPI
from app.routers.candidates import router as candidates_router
from app.routers.constituencies import router as constituencies_router
from app.routers.constituency_parties import router as constituency_parties_router
from app.routers.parties import router as parties_router
from app.routers.votes import router as votes_router
from app.routers.admin import router as admin_router
from fastapi.middleware.cors import CORSMiddleware
import os

if os.getenv('FASTAPI_DEBUG', 'False') == 'True':
    app = FastAPI()
else:
    app = FastAPI(docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(candidates_router, prefix="/candidates")
app.include_router(constituencies_router, prefix="/constituencies")
app.include_router(constituency_parties_router, prefix="/constituency_parties")
app.include_router(parties_router, prefix="/parties")
app.include_router(votes_router, prefix="/votes")
app.include_router(admin_router, prefix="/admin")


@app.get("/")
def read_home():
    return {"message": "Hello!"}