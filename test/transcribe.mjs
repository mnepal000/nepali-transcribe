// Node verification for the NepaliVani transcription path.
// Usage: node transcribe.mjs <audio> [model] [dtype]
// Converts audio to 16k mono float32 via ffmpeg, runs the same pipeline
// options the browser app uses, and prints timestamped chunks.
import { pipeline } from '@huggingface/transformers';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const audioPath = process.argv[2];
const model = process.argv[3] || 'Xenova/whisper-tiny';
const dtype = process.argv[4] || 'fp32';
if (!audioPath) { console.error('usage: node transcribe.mjs <audio> [model] [dtype]'); process.exit(1); }

const rawPath = '/tmp/nv-test-audio.f32';
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', audioPath, '-ar', '16000', '-ac', '1', '-f', 'f32le', rawPath]);
const buf = readFileSync(rawPath);
const audio = new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.length / 4));
console.log(`audio: ${(audio.length / 16000).toFixed(1)}s @16k mono`);

const transcriber = await pipeline('automatic-speech-recognition', model, { device: 'cpu', dtype });
const out = await transcriber(audio, {
  chunk_length_s: 30,
  stride_length_s: 5,
  return_timestamps: true,
  language: 'nepali',
  task: 'transcribe',
});

console.log('--- text ---');
console.log(out.text);
console.log('--- chunks ---');
for (const c of out.chunks || []) {
  const ts = Array.isArray(c.timestamp) ? c.timestamp.map(x => (x == null ? '?' : x.toFixed(2))).join(' -> ') : '?';
  console.log(`[${ts}] ${c.text}`);
}
writeFileSync('/tmp/nv-test-out.json', JSON.stringify(out, null, 2));
console.log(`\nchunks: ${(out.chunks || []).length}, full output -> /tmp/nv-test-out.json`);
