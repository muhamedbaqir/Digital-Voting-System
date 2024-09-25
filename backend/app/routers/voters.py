from fastapi import APIRouter, HTTPException
from app.database import session
from app.basemodels import Voter
from cassandra.query import SimpleStatement
from uuid import UUID, uuid4

router = APIRouter(tags=["Voters"])


@router.post("/", response_model=UUID, description="Creates a new voter and returns the unique voter ID.")
def create_voter(voter: Voter):
    voter_id = uuid4()
    query = SimpleStatement("""
        INSERT INTO voters (voter_id, name, address, birth_date, registered_date)
        VALUES (%s, %s, %s, %s, %s)
    """)
    session.execute(query, (voter_id, voter.name, voter.address, voter.birth_date, voter.registered_date))
    return voter_id

@router.get("/{voter_id}", response_model=Voter, description="Retrieves a voter by their unique ID.")
def get_voter(voter_id: UUID):
    query = SimpleStatement("SELECT * FROM voters WHERE voter_id = %s")
    result = session.execute(query, (voter_id,)).one()
    
    if result is None:
        raise HTTPException(status_code=404, detail="Voter not found")
    
    return Voter(
        name=result.name,
        address=result.address,
        birth_date=result.birth_date,
        registered_date=result.registered_date
    )

@router.put("/{voter_id}", response_model=Voter, description="Updates a voter's details and returns the updated voter.")
def update_voter(voter_id: UUID, voter: Voter):
    query = SimpleStatement("""
        UPDATE voters
        SET name = %s, address = %s, birth_date = %s, registered_date = %s
        WHERE voter_id = %s
    """)
    session.execute(query, (voter.name, voter.address, voter.birth_date, voter.registered_date, voter_id))
    
    return voter

@router.delete("/{voter_id}", description="Deletes a voter by their unique ID.")
def delete_voter(voter_id: UUID):
    query = SimpleStatement("DELETE FROM voters WHERE voter_id = %s")
    session.execute(query, (voter_id,))
    return {"message": "Voter deleted successfully"}

@router.get("/", response_model=list[Voter], description="Retrieves a list of all voters.")
def get_all_voters():
    query = SimpleStatement("SELECT * FROM voters")
    result = session.execute(query)
    voters = []
    
    for row in result:
        voters.append({
            "voter_id": row.voter_id,
            "name": row.name,
            "address": row.address,
            "birth_date": row.birth_date,
            "registered_date": row.registered_date
        })
    
    return voters
