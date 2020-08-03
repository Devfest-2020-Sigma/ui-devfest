## install 
# apt install -y ffmpeg


INPUT_VIDEO=/dev/video0
OUTPUT_VIDEO=/tmp/output.mkv
IMG_IN=/tmp/in
IMG_OUT=/tmp/out
IMG_REJECT=/tmp/reject
CAPTURE_MOSAIC=/tmp/out/mosaic.jpg



mkdir -p ${IMG_IN} ${IMG_OUT} ${IMG_REJECT}
rm -f ${IMG_OUT}/* ${IMG_REJECT}/*

# on prend un video de 5s pour être sur d'avoir assez d'image pour l'autocrop
ffmpeg -hide_banner -loglevel panic -y -f v4l2 -input_format mjpeg -framerate 30 -video_size 1920x1080 -i ${INPUT_VIDEO} -t 00:00:05 -c copy ${OUTPUT_VIDEO}
ffmpeg -hide_banner -loglevel panic -i ${OUTPUT_VIDEO} -r 1 -f image2 ${IMG_IN}/output-%3d.jpg

LD_PRELOAD=/usr/lib/arm-linux-gnueabihf/libatomic.so.1 /usr/local/autocrop/bin/autocrop --input ${IMG_IN} --output ${IMG_OUT} --reject ${IMG_REJECT} --height 600 --width 500

# on ne garde que les 4 dernieres
rm -f $(ls ${IMG_OUT}/* |head -n-4)

# mosaic
montage $(ls ${IMG_OUT}/*) -geometry +2+2 ${CAPTURE_MOSAIC}

