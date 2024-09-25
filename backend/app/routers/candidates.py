from fastapi import APIRouter, HTTPException, Depends
from uuid import UUID, uuid4
from typing import List
from app.database import session
from app.basemodels import Candidate
from app.checkadmin import check_admin_permissions

router = APIRouter(tags=["Candidates"])

@router.post("/", response_model=Candidate,  description="Creates a new candidate with a name and party affiliation. The candidate's details, including their unique ID, are returned upon successful creation.")
def create_candidate(candidate: Candidate, current_user: str = Depends(check_admin_permissions)):
    candidate_id = uuid4()
    query = "INSERT INTO candidates (candidate_id, name, constituency_party_id) VALUES (%s, %s, %s)"
    session.execute(query, (candidate_id, candidate.name, candidate.constituency_party_id))
    return {"candidate_id": candidate_id, "name": candidate.name, "constituency_party_id": candidate.constituency_party_id}

@router.get("/{candidate_id}", response_model=Candidate, description="Fetch a candidate's details using their unique candidate ID. Returns 404 if the candidate is not found.")
async def read_candidate(candidate_id: UUID):
    query = "SELECT * FROM candidates WHERE candidate_id=%s"
    row = session.execute(query, (candidate_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return Candidate(**row._asdict())

@router.put("/{candidate_id}", response_model=Candidate, description="Update an existing candidate's details such as name and party affiliation using their unique candidate ID. Returns the updated candidate information.")
async def update_candidate(candidate_id: UUID, candidate: Candidate, current_user: str = Depends(check_admin_permissions)):
    query = """
    UPDATE candidates
    SET name=%s, constituency_party_id=%s
    WHERE candidate_id=%s
    """
    session.execute(query, (candidate.name, candidate.constituency_party_id, candidate_id))
    return Candidate(
        candidate_id=candidate_id,
        name=candidate.name,
        constituency_party_id=candidate.constituency_party_id
    )


@router.delete("/{candidate_id}", response_model=Candidate, description="Delete a candidate by their unique candidate ID. Returns the details of the deleted candidate. Returns 404 if the candidate is not found.")
async def delete_candidate(candidate_id: UUID, current_user: str = Depends(check_admin_permissions)):
    query = "SELECT * FROM candidates WHERE candidate_id=%s"
    row = session.execute(query, (candidate_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    query = "DELETE FROM candidates WHERE candidate_id=%s"
    session.execute(query, (candidate_id,))
    return Candidate(**row._asdict())


@router.get("/fromconstituency/{constituency_id}", response_model=List[Candidate], description="Retrieve a list of candidates based on the constituency ID. This will return all candidates who are running in the specified constituency.")
async def list_candidates(constituency_id: UUID):
    # Retrieve the constituency parties associated with the provided constituency_id
    query_parties = "SELECT constituency_party_id FROM constituency_parties WHERE constituency_id=%s ALLOW FILTERING"
    parties = session.execute(query_parties, (constituency_id,))
    
    # Convert the resulting parties into a list of IDs
    constituency_party_ids = [party.constituency_party_id for party in parties]
    if not constituency_party_ids:
        raise HTTPException(status_code=404, detail="No constituency parties found for this constituency.")
    
    # Retrieve candidates that belong to these constituency parties
    query_candidates = "SELECT * FROM candidates WHERE constituency_party_id IN (%s)" % ','.join(['%s'] * len(constituency_party_ids)) + " ALLOW FILTERING"
    rows = session.execute(query_candidates, tuple(constituency_party_ids))
    candidates = [Candidate(**row._asdict()) for row in rows]

    return candidates