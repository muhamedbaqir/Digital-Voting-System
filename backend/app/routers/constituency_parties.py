from fastapi import APIRouter, HTTPException, Depends
from app.database import session
from app.basemodels import Constituency_Party
from uuid import uuid4, UUID
from app.checkadmin import check_admin_permissions
from typing import List

router = APIRouter(tags=["Constituency parties"])

@router.post("/", response_model=Constituency_Party, description="Creates a new constituency party and returns its ID and name.")
def create_party(constituency_party: Constituency_Party, current_user: str = Depends(check_admin_permissions)):
    constituency_party_id = uuid4()
    query = "INSERT INTO constituency_parties (constituency_party_id,constituency_id, name) VALUES (%s, %s, %s)"
    session.execute(query, (constituency_party_id, constituency_party.constituency_id,constituency_party.name))
    return {"constituency_party_id": constituency_party_id,"constituency_id":constituency_party.constituency_id, "name": constituency_party.name}

@router.get("/{constituency_party_id}", response_model=Constituency_Party, description="Retrieves a constituency party by its unique ID.")
def read_party(constituency_party_id: UUID):
    query = "SELECT * FROM constituency_parties WHERE constituency_party_id=%s"
    row = session.execute(query, (constituency_party_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Constituency_Party not found")
    return Constituency_Party(**row._asdict())

@router.get("/fromconstituency/{constituency_id}", response_model=List[Constituency_Party], description="Retrieves a constituency party by its constituency ID.")
def read_party_by_constituency_id(constituency_id: UUID):
    query = "SELECT * FROM constituency_parties WHERE constituency_id=%s ALLOW FILTERING"
    rows = session.execute(query, (constituency_id,))
    print(rows)
    if rows is None:
        raise HTTPException(status_code=404, detail="Constituency_Party not found")
    constituency_parties = [Constituency_Party(**row._asdict()) for row in rows]
    return constituency_parties

@router.put("/{constituency_party_id}", response_model=Constituency_Party, description="Updates the details of a constituency party and returns the updated party.")
async def update_party(constituency_party_id: UUID, constituency_party: Constituency_Party, current_user: str = Depends(check_admin_permissions)):
    query = """
    UPDATE constituency_parties
    SET name=%s, constituency_id=%s
    WHERE constituency_party_id=%s
    """
    session.execute(query, (constituency_party.name,constituency_party.constituency_id, constituency_party_id))
    return Constituency_Party(
        constituency_party_id=constituency_party_id,
        constituency_id=constituency_party.constituency_id,
        name=constituency_party.name
    )

@router.delete("/{constituency_party_id}", response_model=Constituency_Party, description="Deletes a constituency party by its unique ID.")
async def delete_party(constituency_party_id: UUID, current_user: str = Depends(check_admin_permissions)):
    query = "SELECT * FROM constituency_parties WHERE constituency_party_id=%s"
    row = session.execute(query, (constituency_party_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Constituency_Party not found")
    
    query = "DELETE FROM constituency_parties WHERE constituency_party_id=%s"
    session.execute(query, (constituency_party_id,))
    return Constituency_Party(**row._asdict())

@router.get("/", response_model=List[Constituency_Party], description="Retrieves a list of all constituency parties.")
async def list_constituency_parties():
    query = "SELECT * FROM constituency_parties"
    rows = session.execute(query)
    constituency_parties = [Constituency_Party(**row._asdict()) for row in rows]
    return constituency_parties