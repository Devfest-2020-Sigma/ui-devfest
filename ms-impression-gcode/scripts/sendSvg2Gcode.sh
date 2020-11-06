#!/bin/sh
URL=$1
ID=$2
FICHIER=$3
FOLDER=$4
curl -s "${URL}/${ID}" --output "${FOLDER}/${ID}/${FICHIER}.svg"
svg2gcode -B -F -w 145 "${FOLDER}/${ID}/${FICHIER}.svg" "${FOLDER}/${ID}/${FICHIER}.gcode"
curl -X POST 'http://localhost:8080/api/v1/files/uploadAndOpen' --form "file=@${FOLDER}/${ID}/${FICHIER}.gcode"
curl -X POST 'http://localhost:8080/api/v1/files/send'