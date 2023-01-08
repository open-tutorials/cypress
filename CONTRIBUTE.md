# Как контрибутить

Присылайте пулрегвесты, если вы хотите улучшить [туториалы](tutorials) или добавить новые.

# Скринкасты и GIF

Для сжатия скринкастов в MP4:
```bash
ffmpeg -i my_video.mov -vcodec h264 -acodec mp2 my_video.mp4
```

Для конвертации видео в GIF:

```bash
ffmpeg -i delivery_case.mov \
-vf "fps=10,scale=1600:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=32[p];[s1][p]paletteuse=dither=bayer" \
delivery_case.gif
```

# Диаграммы

Онлайн редактор https://mermaid.live/