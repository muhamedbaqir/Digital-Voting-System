from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.basemodels import Election
from typing import List, Optional
from uuid import UUID
from datetime import datetime

router = APIRouter()

elections_db = [
    Election(election_id=UUID("12345678-1234-5678-1234-567812345678"), name="Election 2024", date=datetime(2024, 10, 20), is_running=False),
    Election(election_id=UUID("87654321-8765-4321-8765-432187654321"), name="Election 2023", date=datetime(2023, 5, 15), is_running=True)
]

@router.get("/{election_id}/results")
async def get_results(election_id: UUID):
    for election in elections_db:
        if election.election_id == election_id:
            if election.results:
                return election.results
            else:
                raise HTTPException(status_code=404, detail="No results available yet.")
    raise HTTPException(status_code=404, detail="Election not found.")

@router.get("/{election_id}/isrunning")
async def is_running(election_id: UUID):
    for election in elections_db:
        if election.election_id == election_id:
            return {"is_running": election.is_running}
    raise HTTPException(status_code=404, detail="Election not found.")

@router.post("/{election_id}/toggle")
async def toggle_election(election_id: UUID):
    for election in elections_db:
        if election.election_id == election_id:
            election.is_running = not election.is_running
            return {"election_id": election_id, "new_status": "running" if election.is_running else "stopped"}
    raise HTTPException(status_code=404, detail="Election not found.")

@router.get("/elections")
async def get_all_elections():
    return elections_db
