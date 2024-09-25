from fastapi import APIRouter, HTTPException
from uuid import UUID, uuid4
from typing import List, Dict
from app.database import session
from app.basemodels import Vote

router = APIRouter(tags=["Votes"])


@router.post("/", response_model=Vote, description="Creates a new vote and returns the vote details.")
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

@router.get("/party-vote-counts", response_model=Dict[UUID, int], description="Retrieves the count of votes for each party.")
async def get_party_vote_counts():
    query = "SELECT party_id FROM votes"
    rows = session.execute(query)
    party_vote_counts = {}
    for row in rows:
        party_id = row.party_id
        if party_id in party_vote_counts:
            party_vote_counts[party_id] += 1
        else:
            party_vote_counts[party_id] = 1
    return party_vote_counts

@router.get("/candidate-vote-counts", response_model=Dict[UUID, int], description="Retrieves the count of votes for each candidate.")
async def get_candidate_vote_counts():
    query = "SELECT candidate_id FROM votes"
    rows = session.execute(query)
    candidate_vote_counts = {}
    for row in rows:
        candidate_id = row.candidate_id
        if candidate_id in candidate_vote_counts:
            candidate_vote_counts[candidate_id] += 1
        else:
            candidate_vote_counts[candidate_id] = 1
    return candidate_vote_counts

@router.get("/{vote_id}", response_model=Vote, description="Retrieves a vote by its unique ID.")
async def read_vote(vote_id: UUID):
    query = "SELECT * FROM votes WHERE vote_id=%s"
    row = session.execute(query, (vote_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Vote not found")
    return Vote(**row._asdict())

@router.put("/{vote_id}", response_model=Vote, description="Updates a vote's details and returns the updated vote.")
async def update_vote(vote_id: UUID, vote: Vote):
    query = """
    UPDATE votes
    SET party_id=%s, candidate_id=%s, voter_hash=%s 
    WHERE vote_id=%s
    """
    session.execute(query, (vote.party_id, vote.candidate_id, vote.voter_hash, vote_id))
    return Vote(
        vote_id=vote_id,
        party_id=vote.party_id,
        candidate_id=vote.candidate_id,
        voter_hash=vote.voter_hash,
    )

@router.delete("/{vote_id}", response_model=Vote, description="Deletes a vote by its unique ID.")
async def delete_vote(vote_id: UUID):
    query = "SELECT * FROM votes WHERE vote_id=%s"
    row = session.execute(query, (vote_id,)).one()
    if row is None:
        raise HTTPException(status_code=404, detail="Vote not found")
    
    query = "DELETE FROM votes WHERE vote_id=%s"
    session.execute(query, (vote_id,))
    return Vote(**row._asdict())

@router.get("/", response_model=List[Vote], description="Retrieves a list of all votes.")
async def list_votes():
    query = "SELECT * FROM votes"
    rows = session.execute(query)
    votes = [Vote(**row._asdict()) for row in rows]
    return votes
