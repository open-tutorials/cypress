# Как контрибутить

Присылайте пулрегвесты, если вы хотите улучшить [туториалы](tutorials) или добавить новые.

# Скринкасты и GIF

Для сжатия скринкастов в MP4:
```bash
ffmpeg -i hello_from_anton.mp4 -vcodec h264 -acodec mp2 hello_from_anton1.mp4

ffmpeg -i hello_from_anton.mp4 -vcodec libx265 -crf 28 -acodec mp2 hello_from_anton2.mp4

ffmpeg -i hello_from_anton.mp4 -b:v 750k -quality good -speed 0 -crf 33 \
-c:v libvpx-vp9 -c:a libopus hello_from_anton.webm
```

Для конвертации видео в GIF:

```bash
ffmpeg -i delivery_case.mov \
-vf "fps=10,scale=1600:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=32[p];[s1][p]paletteuse=dither=bayer" \
delivery_case.gif
```

# Диаграммы

Онлайн редактор https://mermaid.live/