# Как контрибутить

Присылайте пулрегвесты, если вы хотите улучшить [туториалы](tutorials) или добавить новые.

# Сжатие изображений

```bash
convert thumbnail.jpg -quality 80 thumbnail.jpg
```

# Скринкасты и GIF

Для сжатия скринкастов в MP4:
```bash
ffmpeg -i screen.mp4 -vcodec h264 -acodec mp2 screen.mp4
```

## WebM

```bash
ffmpeg \
-i hello_from_anton.mp4 \
-vcodec libvpx-vp9 \
-vf "scale=800:-1" \
-b:v 1M \
-crf 33 \
-acodec libvorbis \
hello_from_anton_6.webm
```

Для конвертации видео в GIF:

```bash
ffmpeg -i delivery_case.mov \
-vf "fps=10,scale=1600:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=32[p];[s1][p]paletteuse=dither=bayer" \
delivery_case.gif
```

# Диаграммы

Онлайн редактор https://mermaid.live/