from fastapi import APIRouter, HTTPException
from app.basemodels import Constituency
from app.database import session
from cassandra.query import SimpleStatement
from uuid import UUID, uuid4

router = APIRouter()

@router.post("/", response_model=UUID)
def create_constituency(constituency: Constituency):
    constituency_id = uuid4()
    query = SimpleStatement("""
        INSERT INTO constituencies (constituency_id, name, region, population)
        VALUES (%s, %s, %s, %s)
    """)
    session.execute(query, (constituency_id, constituency.name, constituency.region, constituency.population))
    return constituency_id

@router.get("/{constituency_id}", response_model=Constituency)
def get_constituency(constituency_id: UUID):
    query = SimpleStatement("SELECT * FROM constituencies WHERE constituency_id = %s")
    result = session.execute(query, (constituency_id,)).one()
    
    if result is None:
        raise HTTPException(status_code=404, detail="Constituency not found")
    
    return Constituency(
        name=result.name,
        region=result.region,
        population=result.population
    )

@router.put("/{constituency_id}", response_model=Constituency)
def update_constituency(constituency_id: UUID, constituency: Constituency):
    query = SimpleStatement("""
        UPDATE constituencies
        SET name = %s, region = %s, population = %s
        WHERE constituency_id = %s
    """)
    session.execute(query, (constituency.name, constituency.region, constituency.population, constituency_id))
    
    return constituency

@router.delete("/{constituency_id}")
def delete_constituency(constituency_id: UUID):
    query = SimpleStatement("DELETE FROM constituencies WHERE constituency_id = %s")
    session.execute(query, (constituency_id,))
    return {"message": "Constituency deleted successfully"}

@router.get("/")
def get_all_constituencies():
    query = SimpleStatement("SELECT * FROM constituencies")
    result = session.execute(query)
    constituencies = []
    
    for row in result:
        constituencies.append({
            "constituency_id": row.constituency_id,
            "name": row.name,
            "region": row.region,
            "population": row.population
        })
    
    return constituencies
