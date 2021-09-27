#!/bin/sh
IP=$1
set -x

curl "http://$IP:8080/api/v1/machine/sendGcode" \
  -H 'Content-Type: application/json' \
  --data-raw '{"commands":"M03S800"}'
