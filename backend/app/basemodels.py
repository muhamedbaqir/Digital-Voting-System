from pydantic import BaseModel
from uuid import UUID
from datetime import date, datetime
from typing import Optional

class Candidate(BaseModel):
    candidate_id: Optional[UUID] = None
    name: str
    constituency_party_id: UUID

class Party(BaseModel):
    party_id: Optional[UUID] = None
    name: str

class Constituency(BaseModel):
    constituency_id: Optional[UUID] = None
    name: str

class Constituency_Party(BaseModel):
    constituency_party_id: Optional[UUID] = None
    constituency_id: UUID
    name: str

class Vote(BaseModel):
    vote_id: Optional[UUID] = None
    party_id: UUID
    candidate_id: UUID
    voter_hash: str
