from fastapi import APIRouter, HTTPException, Depends 
from app.database import session
from app.basemodels import Party
from uuid import uuid4, UUID
from typing import List
from app.checkadmin import check_admin_permissions

router = APIRouter(tags=["Parties"])


@router.post("/", response_model=Party, description="Creates a new party and returns its ID and name.")
def create_party(party: Party, current_user: str = Depends(check_admin_permissions)):
    party_id = uuid4()
    query = "INSERT INTO parties (party_id, name) VALUES (%s, %s)"
    session.execute(query, (party_id, party.name))
    return {"party_id": party_id, "name": party.name}

@router.get("/{party_id}", response_model=Party, description="Retrieves a party by its unique ID.")
def read_party(party_id: UUID):
    query = "SELECT * FROM parties WHERE party_id=%s"
    row = session.execute(query, (party_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Party not found")
    return Party(**row._asdict())

@router.put("/{party_id}", response_model=Party, description="Updates the details of a party and returns the updated party.")
async def update_party(party_id: UUID, party: Party, current_user: str = Depends(check_admin_permissions)):
    query = """
    UPDATE parties
    SET name=%s
    WHERE party_id=%s
    """
    session.execute(query, (party.name, party_id))
    return Party(
        party_id=party_id,
        name=party.name,
    )

@router.delete("/{party_id}", response_model=Party, description="Deletes a party by its unique ID.")
async def delete_party(party_id: UUID, current_user: str = Depends(check_admin_permissions)):
    query = "SELECT * FROM parties WHERE party_id=%s"
    row = session.execute(query, (party_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Party not found")
    
    query = "DELETE FROM parties WHERE party_id=%s"
    session.execute(query, (party_id,))
    return Party(**row._asdict())

@router.get("/", response_model=List[Party], description="Retrieves a list of all parties.")
async def list_parties():
    query = "SELECT * FROM parties"
    rows = session.execute(query)
    parties = [Party(**row._asdict()) for row in rows]
    return parties