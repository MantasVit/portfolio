#!/bin/bash
npm run build
docker build -t mantas-portfolio .
docker rm -f mantas-portfolio || true
docker run --name mantas-portfolio --restart always -d -p 24580:80 mantas-portfolio
