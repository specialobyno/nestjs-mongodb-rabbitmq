#!/bin/bash

docker-compose up --remove-orphans

sleep 5

docker exec mongo1 /scripts/rs-init.sh