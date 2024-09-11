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

CREATE INDEX ON admins(username);

CREATE TABLE IF NOT EXISTS voters (
    voter_id UUID PRIMARY KEY,
    name text,
    address text,
    birth_date date,
    registered_date timestamp
);

CREATE TABLE IF NOT EXISTS candidates (
    candidate_id UUID PRIMARY KEY,
    name text,
    party text,
    position text,
    campaign_slogan text
);

CREATE TABLE IF NOT EXISTS constituencies (
    constituency_id UUID PRIMARY KEY,
    name text,
    region text,
    population int
);

CREATE TABLE IF NOT EXISTS elections (
    election_id UUID PRIMARY KEY,
    name text,
    date date,
    constituency_id UUID
);

CREATE TABLE IF NOT EXISTS votes (
    vote_id UUID PRIMARY KEY,
    election_id UUID,
    candidate_id UUID,
    voter_id UUID,
    timestamp timestamp
);
