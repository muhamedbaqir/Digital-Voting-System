from fastapi import APIRouter, HTTPException
from uuid import UUID
from typing import List
from app.database import session
from app.basemodels import Vote

router = APIRouter()
@router.post("/", response_model=Vote)
async def create_vote(vote: Vote):
    query = """
    INSERT INTO votes (vote_id, election_id, candidate_id, voter_id, timestamp)
    VALUES (%s, %s, %s, %s, %s)
    """
    session.execute(query, (vote.vote_id, vote.election_id, vote.candidate_id, vote.voter_id, vote.timestamp))
    return vote

@router.get("/{vote_id}", response_model=Vote)
async def read_vote(vote_id: UUID):
    query = "SELECT * FROM votes WHERE vote_id=%s"
    row = session.execute(query, (vote_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Vote not found")
    return Vote(**row._asdict())

@router.put("/{vote_id}", response_model=Vote)
async def update_vote(vote_id: UUID, vote: Vote):
    query = """
    UPDATE votes
    SET election_id=%s, candidate_id=%s, voter_id=%s, timestamp=%s
    WHERE vote_id=%s
    """
    session.execute(query, (vote.election_id, vote.candidate_id, vote.voter_id, vote.timestamp, vote_id))
    return Vote(
        vote_id=vote_id,
        election_id=vote.election_id,
        candidate_id=vote.candidate_id,
        voter_id=vote.voter_id,
        timestamp=vote.timestamp
    )

@router.delete("/{vote_id}", response_model=Vote)
async def delete_vote(vote_id: UUID):
    query = "SELECT * FROM votes WHERE vote_id=%s"
    row = session.execute(query, (vote_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Vote not found")
    
    query = "DELETE FROM votes WHERE vote_id=%s"
    session.execute(query, (vote_id,))
    return Vote(**row._asdict())

@router.get("/", response_model=List[Vote])
async def list_votes():
    query = "SELECT * FROM votes"
    rows = session.execute(query)
    votes = [Vote(**row._asdict()) for row in rows]
    return votes
