# Digital-Voting-System
Decentralized digital voting system

# Before Starting
create a .env-file from example.env (there is one in / and the react app )

# To Start
docker-compose up --scale fastapi_app=2 --build
for 2 fastapi container

# access
frontend: localhost:3000 (for the voter page) , localhost:3000/admin (for the admin page)
backend: localhost:9999/docs

