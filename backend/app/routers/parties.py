from fastapi import APIRouter, HTTPException 
from app.database import session
from app.basemodels import Party
from uuid import uuid4, UUID

router = APIRouter()


@router.post("/", response_model=Party)
def create_party(party: Party):
    party_id = uuid4()
    query = "INSERT INTO parties (party_id, name) VALUES (%s, %s)"
    session.execute(query, (party_id, party.name))
    return {"party_id": party_id, "name": party.name}

@router.get("/{party_id}", response_model=Party)
def read_party(party_id: UUID):
    query = "SELECT * FROM parties WHERE party_id=%s"
    row = session.execute(query, (party_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Party not found")
    return Party(**row._asdict())

@router.put("/{party_id}", response_model=Party)
async def update_party(party_id: UUID, party: Party):
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

@router.delete("/{party_id}", response_model=Party)
async def delete_candidate(party_id: UUID):
    query = "SELECT * FROM parties WHERE party_id=%s"
    row = session.execute(query, (party_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Party not found")
    
    query = "DELETE FROM parties WHERE party_id=%s"
    session.execute(query, (party_id,))
    return Party(**row._asdict())