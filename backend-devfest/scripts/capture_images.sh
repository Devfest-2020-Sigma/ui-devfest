#!/bin/bash

# Convert.sh ImageToConvert OutputDir Prefix

FolderToSave=${1:-/tmp/TakePhoto}
Essai=${2:-1}
INPUT_VIDEO=/dev/video0
OUTPUT_VIDEO=${FolderToSave}/${Essai}/output.mkv
IMG_REJECT=${FolderToSave}/${Essai}/reject
IMG_CROP=${FolderToSave}/${Essai}/crop

mkdir -p ${IMG_CROP} 
mkdir -p ${IMG_REJECT} 

# on prend un video de 5s pour être sur d'avoir assez d'image pour l'autocrop
ffmpeg -loglevel quiet -hide_banner -y -f v4l2 -input_format mjpeg -framerate 30 -video_size 1920x1080 -i ${INPUT_VIDEO} -t 00:00:03 -c copy ${OUTPUT_VIDEO}
ffmpeg -loglevel quiet -hide_banner -i ${OUTPUT_VIDEO} -r 1 -f image2 ${FolderToSave}/output-%3d.jpg

LD_PRELOAD=/usr/lib/arm-linux-gnueabihf/libatomic.so.1 /usr/local/autocrop/bin/autocrop --input ${FolderToSave} --output ${IMG_CROP} --reject ${IMG_REJECT} --height 600 --width 500

# on ne garde que la derniere
rm -f $(ls ${IMG_CROP}/* |head -n-1)

# on copie l'image restante à la racine du repertoire
cp ${IMG_CROP}/output-*.jpg ${FolderToSave}/capture-${Essai}.jpg