from fastapi import APIRouter, HTTPException 
from app.database import session
from app.basemodels import Constituency_Party
from uuid import uuid4, UUID

router = APIRouter()


@router.post("/", response_model=Constituency_Party)
def create_party(constituency_party: Constituency_Party):
    constituency_party_id = uuid4()
    query = "INSERT INTO constituency_parties (constituency_party_id, name) VALUES (%s, %s)"
    session.execute(query, (constituency_party_id, constituency_party.name))
    return {"constituency_party_id": constituency_party_id, "name": constituency_party.name}

@router.get("/{constituency_party_id}", response_model=Constituency_Party)
def read_party(constituency_party_id: UUID):
    query = "SELECT * FROM constituency_parties WHERE constituency_party_id=%s"
    row = session.execute(query, (constituency_party_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Constituency_Party not found")
    return Constituency_Party(**row._asdict())

@router.put("/{party_id}", response_model=Constituency_Party)
async def update_party(constituency_party_id: UUID, constituency_party: Constituency_Party):
    query = """
    UPDATE constituency_parties
    SET name=%s
    WHERE constituency_party_id=%s
    """
    session.execute(query, (constituency_party.name, constituency_party_id))
    return Constituency_Party(
        constituency_party_id=constituency_party_id,
        name=constituency_party.name,
    )

@router.delete("/{constituency_party_id}", response_model=Constituency_Party)
async def delete_candidate(constituency_party_id: UUID):
    query = "SELECT * FROM constituency_parties WHERE constituency_party_id=%s"
    row = session.execute(query, (constituency_party_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Constituency_Party not found")
    
    query = "DELETE FROM constituency_parties WHERE constituency_party_id=%s"
    session.execute(query, (constituency_party_id,))
    return Constituency_Party(**row._asdict())