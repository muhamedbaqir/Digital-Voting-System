-- init.cql
CREATE KEYSPACE IF NOT EXISTS elections
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE elections;

CREATE TABLE IF NOT EXISTS admins (
    admin_id UUID PRIMARY KEY,
    username text,
    password_hash text,
    created_at timestamp
);

CREATE INDEX IF NOT EXISTS ON admins(username);

CREATE TABLE IF NOT EXISTS voters (
    voter_id UUID PRIMARY KEY,
    name text,
    address text,
    birth_date date
);

CREATE TABLE IF NOT EXISTS candidates (
    candidate_id UUID PRIMARY KEY,
    name text,
    constituency_party_id UUID,
    constituency_id UUID
);

CREATE TABLE IF NOT EXISTS constituencies (
    constituency_id UUID PRIMARY KEY,
    name text,
    region text,
    population int
);

CREATE TABLE IF NOT EXISTS constituency_parties (
    constituency_party_id UUID PRIMARY KEY,
    name text
);

CREATE TABLE IF NOT EXISTS parties (
    party_id UUID PRIMARY KEY,
    name text
);

CREATE TABLE IF NOT EXISTS votes (
    vote_id UUID PRIMARY KEY,
    election_id UUID,
    candidate_id UUID,
    voter_id UUID,
    party_id UUID
);
