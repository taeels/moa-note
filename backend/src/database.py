from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

DATABASE_URL = "postgresql://user:password@db:5432/db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    commits = relationship("Commit", back_populates="author")
    digests = relationship("Digest", back_populates="user")

class Commit(Base):
    __tablename__ = "commits"
    id = Column(Integer, primary_key=True, index=True)
    gerrit_id = Column(String, unique=True, index=True)
    subject = Column(String)
    message = Column(Text)
    project = Column(String)
    branch = Column(String)
    status = Column(String) # e.g., merged, open, abandoned
    author_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    author = relationship("User", back_populates="commits")
    commit_clusters = relationship("CommitCluster", back_populates="commit")

class Cluster(Base):
    __tablename__ = "clusters"
    id = Column(Integer, primary_key=True, index=True)
    summary_ai_prompt = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    commit_clusters = relationship("CommitCluster", back_populates="cluster")
    summaries = relationship("Summary", back_populates="cluster")

class CommitCluster(Base):
    __tablename__ = "commit_clusters"
    commit_id = Column(Integer, ForeignKey("commits.id"), primary_key=True)
    cluster_id = Column(Integer, ForeignKey("clusters.id"), primary_key=True)

    commit = relationship("Commit", back_populates="commit_clusters")
    cluster = relationship("Cluster", back_populates="commit_clusters")

class Summary(Base):
    __tablename__ = "summaries"
    id = Column(Integer, primary_key=True, index=True)
    cluster_id = Column(Integer, ForeignKey("clusters.id"))
    content = Column(Text)
    generated_by_ai = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    cluster = relationship("Cluster", back_populates="summaries")
    digest_summaries = relationship("DigestSummary", back_populates="summary")

class Digest(Base):
    __tablename__ = "digests"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    version = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="digests")
    digest_summaries = relationship("DigestSummary", back_populates="digest")

class DigestSummary(Base):
    __tablename__ = "digest_summaries"
    digest_id = Column(Integer, ForeignKey("digests.id"), primary_key=True)
    summary_id = Column(Integer, ForeignKey("summaries.id"), primary_key=True)

    digest = relationship("Digest", back_populates="digest_summaries")
    summary = relationship("Summary", back_populates="digest_summaries")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    Base.metadata.create_all(bind=engine)
