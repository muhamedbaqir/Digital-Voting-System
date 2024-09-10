from fastapi import APIRouter, HTTPException
from uuid import UUID
from typing import List
from app.database import session
from app.basemodels import Candidate

router = APIRouter()

@router.post("/", response_model=Candidate)
async def create_candidate(candidate: Candidate):
    query = """
    INSERT INTO candidates (candidate_id, name, party, position, campaign_slogan)
    VALUES (%s, %s, %s, %s, %s)
    """
    session.execute(query, (candidate.candidate_id, candidate.name, candidate.party, candidate.position, candidate.campaign_slogan))
    return candidate

@router.get("/{candidate_id}", response_model=Candidate)
async def read_candidate(candidate_id: UUID):
    query = "SELECT * FROM candidates WHERE candidate_id=%s"
    row = session.execute(query, (candidate_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return Candidate(**row._asdict())

@router.put("/{candidate_id}", response_model=Candidate)
async def update_candidate(candidate_id: UUID, candidate: Candidate):
    query = """
    UPDATE candidates
    SET name=%s, party=%s, position=%s, campaign_slogan=%s
    WHERE candidate_id=%s
    """
    session.execute(query, (candidate.name, candidate.party, candidate.position, candidate.campaign_slogan, candidate_id))
    return Candidate(
        candidate_id=candidate_id,
        name=candidate.name,
        party=candidate.party,
        position=candidate.position,
        campaign_slogan=candidate.campaign_slogan
    )

@router.delete("/{candidate_id}", response_model=Candidate)
async def delete_candidate(candidate_id: UUID):
    query = "SELECT * FROM candidates WHERE candidate_id=%s"
    row = session.execute(query, (candidate_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    query = "DELETE FROM candidates WHERE candidate_id=%s"
    session.execute(query, (candidate_id,))
    return Candidate(**row._asdict())

@router.get("/", response_model=List[Candidate])
async def list_candidates():
    query = "SELECT * FROM candidates"
    rows = session.execute(query)
    candidates = [Candidate(**row._asdict()) for row in rows]
    return candidates
