#!/bin/sh
IP=$1

curl "http://$IP:8080/api/v1/machine/sendGcode" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Content-Type: application/json' \
  --data-raw '{"commands":"M03S800"}'
