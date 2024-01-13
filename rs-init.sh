#!/bin/bash

mongo <<EOF
var config = {
    "_id": "rs0",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo-primary:27017",
            "priority": 3
        },
        {
            "_id": 2,
            "host": "mongo-secondary:27017",
            "priority": 2
        },
        {
            "_id": 3,
            "host": "mongo-arbiter:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF