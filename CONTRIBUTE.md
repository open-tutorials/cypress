# Как контрибутить

Присылайте пулрегвесты, если вы хотите улучшить [туториалы](tutorials) или добавить новые.

## Скринкасты и GIF

Для сжатия скринкастов в MP4:
```bash
ffmpeg -i my_video.mov -vcodec h264 -acodec mp2 my_video.mp4
```

Для конвертации видео в GIF:
```bash
ffmpeg -i my_video.mov -pix_fmt rgb24 my_video.gif
```
