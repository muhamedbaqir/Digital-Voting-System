from fastapi import APIRouter, HTTPException
from uuid import UUID, uuid4
from typing import List
from app.database import session
from app.basemodels import Candidate

router = APIRouter(tags=["Candidates"])

@router.post("/", response_model=Candidate, description="Creates a new candidate with a name, party affiliation, and constituency. The candidate's details, including their unique ID, are returned upon successful creation.")
def create_candidate(candidate: Candidate):
    candidate_id = uuid4()
    query = "INSERT INTO candidates (candidate_id, name, constituency_party_id, constituency_id) VALUES (%s, %s, %s, %s)"
    session.execute(query, (candidate_id, candidate.name, candidate.constituency_party_id, candidate.constituency_id))
    return {"candidate_id": candidate_id, "name": candidate.name, "constituency_party_id": candidate.constituency_party_id, "constituency_id": candidate.constituency_id}

@router.get("/{candidate_id}", response_model=Candidate, description="Fetch a candidate's details using their unique candidate ID. Returns 404 if the candidate is not found.")
async def read_candidate(candidate_id: UUID):
    query = "SELECT * FROM candidates WHERE candidate_id=%s"
    row = session.execute(query, (candidate_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return Candidate(**row._asdict())

@router.put("/{candidate_id}", response_model=Candidate, description="Update an existing candidate's details such as name, party affiliation, and constituency using their unique candidate ID. Returns the updated candidate information.")
async def update_candidate(candidate_id: UUID, candidate: Candidate):
    query = """
    UPDATE candidates
    SET name=%s, party_id=%s, constituency_id=%s
    WHERE candidate_id=%s
    """
    session.execute(query, (candidate.name, candidate.constituency_party_id, candidate.constituency_id, candidate_id))
    return Candidate(
        candidate_id=candidate_id,
        name=candidate.name,
        party_id=candidate.constituency_party_id,
        constituency_id=candidate.constituency_id
    )


@router.delete("/{candidate_id}", response_model=Candidate, description="Delete a candidate by their unique candidate ID. Returns the details of the deleted candidate. Returns 404 if the candidate is not found.")
async def delete_candidate(candidate_id: UUID):
    query = "SELECT * FROM candidates WHERE candidate_id=%s"
    row = session.execute(query, (candidate_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    query = "DELETE FROM candidates WHERE candidate_id=%s"
    session.execute(query, (candidate_id,))
    return Candidate(**row._asdict())


@router.get("/fromconstituency/{constituency_id}", response_model=List[Candidate], description="Retrieve a list of candidates based on the constituency ID. This will return all candidates who are running in the specified constituency.")
async def list_candidates(constituency_id: UUID):
    query = "SELECT * FROM candidates WHERE constituency_id=%s ALLOW FILTERING"
    rows = session.execute(query, (constituency_id,))
    candidates = [Candidate(**row._asdict()) for row in rows]
    return candidates
