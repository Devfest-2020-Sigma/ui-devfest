#!/bin/sh
process=$(ps -aux |grep ffmpeg | egrep -v grep | awk '{print $2}')
if [ $process ] 
then
    echo "kill process $process" 
    kill $process
fi
 
