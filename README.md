# NepaliVani (नेपाली वाणी)

A private, in-browser web app that transcribes Nepali audio with time codes.
Upload an audio clip, get timestamped segments, click any time code to jump,
edit inline, and export as SRT / VTT / TXT / JSON.

**Live:** https://mnepal000.github.io/nepali-transcribe/

## How it works

- Static site (no backend). Transcription runs 100% in the visitor's browser
  using [transformers.js](https://huggingface.co/docs/transformers.js) (`@huggingface/transformers@3.8.1`).
- Model: `onnx-community/whisper-large-v3-turbo` (default, best Nepali accuracy)
  or `onnx-community/whisper-small` (faster). WebGPU with fp16 when available,
  WASM fallback otherwise.
- Long audio is processed in 30-second windows with 5-second stride; the
  pipeline returns `{ timestamp: [start, end], text }` chunks.
- Audio is decoded to 16 kHz mono before transcription. Nothing is uploaded anywhere.

## Files

- `index.html` — page structure
- `styles.css` — dark-glass styling
- `app.js` — upload, decode, transcription, player sync, editing, exports, EN/NE UI
- `assets/sample-nepali.mp3` — bundled Nepali sample clip for the "try a sample" button
- `test/` — Node verification scripts (not deployed)

## Deploy

```sh
cd ~/workspace/nepali-transcribe
git add -A && git commit -m "msg" && git push
```

GitHub Pages serves the `main` branch root.
