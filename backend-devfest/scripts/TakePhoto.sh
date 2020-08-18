#!/bin/bash

# Convert.sh ImageToConvert OutputDir Prefix
# GoToPrint.sh OutputDir Prefix

FolderToSave=${1:-/tmp/TakePhoto}
Prefix=${2:-capture-}
INPUT_VIDEO=/dev/video0
OUTPUT_VIDEO=/tmp/output.mkv

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

ffmpeg -hide_banner -y -f v4l2 -input_format mjpeg -framerate 30 -video_size 1920x1080 -i ${INPUT_VIDEO} -t 00:00:05 -c copy ${OUTPUT_VIDEO}
ffmpeg -hide_banner -i ${OUTPUT_VIDEO} -r 1 -f image2 ${FolderToSave}/output-%3d.jpg

cp "impressions/mosaic.jpg" "${FolderToSave}"
#LD_PRELOAD=/usr/lib/arm-linux-gnueabihf/libatomic.so.1 /usr/local/autocrop/bin/autocrop -i ${FolderToSave} -o ${FolderToSave}/out
