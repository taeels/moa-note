from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import create_tables, get_db, User, Commit, Cluster, Summary, Digest

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_tables()

@app.get("/")
def read_root(db: Session = Depends(get_db)):
    return {"Hello": "World"}