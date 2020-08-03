#!/bin/bash

# Convert.sh ImageToConvert OutputDir Prefix
# GoToPrint.sh OutputDir Prefix

FolderToSave=${1:-/tmp/TakePhoto}
Prefix=${2:-capture-}

mkdir -p ${FolderToSave} 

# On prend 4 photos
for PhotoNumber in {1..4} ; do
  touch ${FolderToSave}/${Prefix}${PhotoNumber}.png
  #ffmpeg \
  #  -y \
  #  -f v4l2 \
  #  -input_format mjpeg \
  #  -video_size 1920x1080 \
  #  -i /dev/video0 \
    echo "${FolderToSave}/${Prefix}${PhotoNumber}.png"
    raspistill -o "${FolderToSave}/${Prefix}${PhotoNumber}.png"
done

cp "impressions/mosaic.jpg" "${FolderToSave}"
#LD_PRELOAD=/usr/lib/arm-linux-gnueabihf/libatomic.so.1 /usr/local/autocrop/bin/autocrop -i ${FolderToSave} -o ${FolderToSave}/out
