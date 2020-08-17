#!/bin/sh
kill $(ps -aux |grep ffmpeg | egrep -v grep | awk '{print $2}')
