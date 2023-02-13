# Как контрибутить

Присылайте пулрегвесты, если вы хотите улучшить [туториалы](tutorials) или добавить новые.

# Сжатие изображений

```bash
convert thumbnail.png -quality 80 thumbnail.jpg
convert thumbnail.png thumbnail.webp
identify fork_conduit.webp
```

# Скринкасты и GIF

Для сжатия скринкастов в MP4:
```bash
ffmpeg -i use_debugger.mov -vcodec h264 -acodec mp2 use_debugger.mp4
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
ffmpeg -i check_postgres.mov \
-vf "fps=10,split[s0][s1];[s0]palettegen=max_colors=16[p];[s1][p]paletteuse=dither=bayer" \
check_postgres.gif
```

```bash
ffmpeg -i git_clone.gif -vf "scale=400:-1" git_clone.gif
```

# Диаграммы

Онлайн редактор https://mermaid.live/

# Выпуск

```bash
git tag v1.16.4
git push origin --tags
```