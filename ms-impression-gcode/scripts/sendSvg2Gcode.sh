#!/bin/sh

IMAGE=$1
svg2gcode -B -F -w 145 ${IMAGE}.svg ${IMAGE}.gcode
curl -X POST 'http://localhost:8080/api/v1/files/uploadAndOpen' --form "file=@${IMAGE}.gcode"
curl -X POST 'http://localhost:8080/api/v1/files/send'