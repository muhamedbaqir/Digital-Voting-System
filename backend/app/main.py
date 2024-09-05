from fastapi import FastAPI
from cassandra.cluster import Cluster
import os 

app = FastAPI()

cluster = Cluster([os.getenv('CASSANDRA_HOST', 'localhost')])
session = cluster.connect()


@app.get("/")
def read_home():
    return {"message": "Hello!"}

@app.get("/data")
def get_data():
    rows = session.execute("SELECT * FROM elections.voters")
    return {"data": [row for row in rows]}
