from fastapi import APIRouter, HTTPException
from uuid import UUID, uuid4
from typing import List
from app.database import session
from app.basemodels import Vote

router = APIRouter()
@router.post("/", response_model=Vote)
async def create_vote(vote: Vote):
    vote_id = uuid4()
    query = """
    INSERT INTO votes (vote_id, party_id, candidate_id, voter_hash)
    VALUES (%s, %s, %s, %s)
    """
    session.execute(query, (vote_id, vote.party_id, vote.candidate_id, vote.voter_hash))
    return Vote(
        vote_id=vote_id,
        party_id=vote.party_id,
        candidate_id=vote.candidate_id,
        voter_hash=vote.voter_hash,
    )
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
    SET election_id=%s, candidate_id=%s, voter_hash=%s 
    WHERE vote_id=%s
    """
    session.execute(query, (vote.party_id, vote.candidate_id, vote.voter_hash, vote_id))
    return Vote(
        vote_id=vote_id,
        party_id=vote.party_id,
        candidate_id=vote.candidate_id,
        voter_hash=vote.voter_hash,
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
