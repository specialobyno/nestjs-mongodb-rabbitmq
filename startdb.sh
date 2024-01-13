#!/bin/bash

docker compose down

docker-compose up --build -V --remove-orphans -d
