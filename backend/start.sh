#!/bin/sh

#exec uvicorn app.main:app --host 0.0.0.0 --port ${SERVER_PORT}
exec uvicorn app.main:app --host 127.0.0.1 --port 8000