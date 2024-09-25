from fastapi import APIRouter, HTTPException, Depends
from app.basemodels import Constituency
from app.database import session
from cassandra.query import SimpleStatement
from uuid import UUID, uuid4
from app.checkadmin import check_admin_permissions

router = APIRouter(tags=["Constituencies"])

@router.post("/", response_model=UUID, description="Creates a new constituency and returns its unique ID.")
def create_constituency(constituency: Constituency, current_user: str = Depends(check_admin_permissions)):
    constituency_id = uuid4()
    query = SimpleStatement("""
        INSERT INTO constituencies (constituency_id, name)
        VALUES (%s, %s)
    """)
    session.execute(query, (constituency_id, constituency.name))
    return constituency_id

@router.get("/{constituency_id}", response_model=Constituency, description="Retrieves a constituency by its unique ID.")
def get_constituency(constituency_id: UUID):
    query = SimpleStatement("SELECT * FROM constituencies WHERE constituency_id = %s")
    result = session.execute(query, (constituency_id,)).one()
    
    if result is None:
        raise HTTPException(status_code=404, detail="Constituency not found")
    
    return Constituency(
        constituency_id = constituency_id,
        name=result.name
    )

@router.put("/{constituency_id}", response_model=Constituency, description="Updates a constituency's details and returns the updated constituency.")
def update_constituency(constituency_id: UUID, constituency: Constituency, current_user: str = Depends(check_admin_permissions)):
    query = SimpleStatement("""
        UPDATE constituencies
        SET name = %s
        WHERE constituency_id = %s
    """)
    session.execute(query, (constituency.name, constituency_id))
    
    return constituency

@router.delete("/{constituency_id}", description="Deletes a constituency by its unique ID.")
def delete_constituency(constituency_id: UUID, current_user: str = Depends(check_admin_permissions)):
    query = SimpleStatement("DELETE FROM constituencies WHERE constituency_id = %s")
    session.execute(query, (constituency_id,))
    return {"message": "Constituency deleted successfully"}

@router.get("/", response_model=list[Constituency], description="Retrieves a list of all constituencies.")
def get_all_constituencies():
    query = SimpleStatement("SELECT * FROM constituencies")
    result = session.execute(query)
    constituencies = []
    
    for row in result:
        constituencies.append({
            "constituency_id": row.constituency_id,
            "name": row.name
        })
    
    return constituencies