from pydantic import BaseModel
from uuid import UUID
from datetime import date, datetime
from typing import Optional

class Candidate(BaseModel):
    candidate_id: UUID
    name: str
    party: str
    position: str
    campaign_slogan: str

class Constituency(BaseModel):
    name: str
    region: str
    population: int

class Election(BaseModel):
    election_id: UUID
    name: str
    date: datetime
    is_running: bool
    results: Optional[dict] = None

class Voter(BaseModel):
    name: str
    address: str
    birth_date: date
    registered_date: datetime

class Vote(BaseModel):
    vote_id: UUID
    election_id: UUID
    candidate_id: UUID
    voter_id: UUID
    timestamp: str
