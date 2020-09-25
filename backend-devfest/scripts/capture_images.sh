#!/bin/bash

# Convert.sh ImageToConvert OutputDir Prefix
# GoToPrint.sh OutputDir Prefix

FolderToSave=${1:-/tmp/TakePhoto}
Prefix=${2:-capture-}
INPUT_VIDEO=/dev/video0
OUTPUT_VIDEO=${FolderToSave}/output.mkv
IMG_REJECT=${FolderToSave}/reject
IMG_CROP=${FolderToSave}/crop
CAPTURE_MOSAIC=${FolderToSave}/mosaic.jpg

mkdir -p ${IMG_CROP} 
mkdir -p ${IMG_REJECT} 

# on prend un video de 5s pour être sur d'avoir assez d'image pour l'autocrop
ffmpeg -loglevel quiet -hide_banner -y -f v4l2 -input_format mjpeg -framerate 30 -video_size 1920x1080 -i ${INPUT_VIDEO} -t 00:00:05 -c copy ${OUTPUT_VIDEO}
ffmpeg -loglevel quiet -hide_banner -i ${OUTPUT_VIDEO} -r 1 -f image2 ${FolderToSave}/output-%3d.jpg

LD_PRELOAD=/usr/lib/arm-linux-gnueabihf/libatomic.so.1 /usr/local/autocrop/bin/autocrop --input ${FolderToSave} --output ${IMG_CROP} --reject ${IMG_REJECT} --height 600 --width 500

# on ne garde que les 4 dernieres
rm -f $(ls ${IMG_CROP}/* |head -n-4)

# mosaic
montage $(ls ${IMG_CROP}/*) -geometry +2+2 ${CAPTURE_MOSAIC}