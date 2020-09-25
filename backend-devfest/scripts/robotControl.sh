#!/bin/sh
IP=$1
METHOD=$2
COMMAND=$3

curl -o - -X $METHOD "http://$IP:8080/api/v1/$COMMAND"