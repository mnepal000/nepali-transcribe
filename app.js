import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/transformers.min.js';

/* ---------------------------------- i18n ---------------------------------- */
const STR = {
  en: {
    tagline: 'Nepali audio transcription with time codes',
    dropTitle: 'Drop your audio here',
    dropSub: 'or click to browse: MP3, WAV, M4A, OGG, WEBM',
    trySample: 'Try a Nepali sample clip',
    privacy: 'Private by design: transcription runs 100% in your browser. Your audio never leaves this device.',
    changeFile: 'Change file',
    modelLabel: 'Model',
    modelTurbo: 'Whisper Large v3 Turbo (best accuracy)',
    modelSmall: 'Whisper Small (faster, smaller)',
    modelNote: 'The model downloads once (Turbo about 810 MB, Small about 250 MB) and is cached in your browser afterwards. Turbo is recommended for Nepali accuracy.',
    transcribe: 'Transcribe',
    transcript: 'Transcript',
    seekHint: 'Click a time code to jump. Double-click text to edit.',
    copy: 'Copy',
    download: 'Download',
    clear: 'Clear',
    howTitle: 'How it works',
    how1: '<b>Upload</b> a Nepali audio clip (interview, speech, song, voice note).',
    how2: '<b>Transcribe</b> with Whisper running locally in your browser via WebGPU.',
    how3: '<b>Review</b> time-coded segments, click any time code to jump, edit text inline.',
    how4: '<b>Export</b> as SRT/VTT subtitles, timestamped TXT, or JSON.',
    howFine: 'Long recordings are processed in 30-second windows. Very long files (1 hr+) work best on a desktop with WebGPU; the smaller model is faster on modest devices. Nothing is uploaded anywhere.',
    footerNote: 'built with Whisper, running entirely on your device',
    stageDownload: 'Downloading model',
    stageDecode: 'Preparing audio',
    stageTranscribing: 'Transcribing',
    stageDone: 'Done',
    elapsed: 'elapsed',
    copied: 'Transcript copied to clipboard.',
    segmentsUnit: n => `${n} segment${n === 1 ? '' : 's'}`,
    errDecode: 'Could not decode that audio file. Please try another file.',
    errModel: 'Could not load the model. Check your internet connection and try again.',
    errTranscribe: 'Transcription failed. Please try again with the smaller model.',
  },
  ne: {
    tagline: 'टाइम कोडसहित नेपाली अडियो ट्रान्सक्रिप्सन',
    dropTitle: 'आफ्नो अडियो यहाँ ड्रप गर्नुहोस्',
    dropSub: 'वा ब्राउज गर्न क्लिक गर्नुहोस्: MP3, WAV, M4A, OGG, WEBM',
    trySample: 'नेपाली नमुना क्लिप प्रयास गर्नुहोस्',
    privacy: 'गोपनीयता सुनिश्चित: ट्रान्सक्रिप्सन १००% तपाईंको ब्राउजरमै हुन्छ। तपाईंको अडियो यो डिभाइसबाट कहिल्यै बाहिर जाँदैन।',
    changeFile: 'फाइल परिवर्तन',
    modelLabel: 'मोडेल',
    modelTurbo: 'Whisper Large v3 Turbo (उत्तम शुद्धता)',
    modelSmall: 'Whisper Small (छिटो, सानो)',
    modelNote: 'मोडेल एकपटक डाउनलोड हुन्छ (Turbo करिब ८१० MB, Small करिब २५० MB) र त्यसपछि तपाईंको ब्राउजरमा सुरक्षित रहन्छ। नेपाली शुद्धताका लागि Turbo सिफारिस गरिन्छ।',
    transcribe: 'ट्रान्सक्राइब गर्नुहोस्',
    transcript: 'प्रतिलिपि',
    seekHint: 'जम्प गर्न टाइम कोडमा क्लिक गर्नुहोस्। सम्पादन गर्न टेक्स्टमा डबल-क्लिक गर्नुहोस्।',
    copy: 'कपी',
    download: 'डाउनलोड',
    clear: 'हटाउनुहोस्',
    howTitle: 'यसले कसरी काम गर्छ',
    how1: '<b>अपलोड</b> गर्नुहोस् नेपाली अडियो क्लिप (अन्तर्वार्ता, भाषण, गीत, भ्वाइस नोट)।',
    how2: '<b>ट्रान्सक्राइब</b> गर्नुहोस्: Whisper तपाईंको ब्राउजरमै WebGPU मार्फत चल्छ।',
    how3: '<b>समीक्षा</b> गर्नुहोस् टाइम कोडसहितका खण्डहरू, जम्प गर्न कुनै पनि टाइम कोडमा क्लिक गर्नुहोस्, टेक्स्ट सिधै सम्पादन गर्नुहोस्।',
    how4: '<b>एक्सपोर्ट</b> गर्नुहोस् SRT/VTT सबटाइटल, टाइम कोडसहितको TXT, वा JSON का रूपमा।',
    howFine: 'लामो रेकर्डिङहरू ३०-सेकेन्डका विन्डोहरूमा प्रशोधन गरिन्छ। धेरै लामो फाइलहरू (१ घण्टाभन्दा बढी) WebGPU भएको डेस्कटपमा उत्तम हुन्छन्; सामान्य डिभाइसमा सानो मोडेल छिटो हुन्छ। केही पनि अपलोड हुँदैन।',
    footerNote: 'Whisper बाट निर्मित, पूर्ण रूपमा तपाईंको डिभाइसमा चल्ने',
    stageDownload: 'मोडेल डाउनलोड हुँदैछ',
    stageDecode: 'अडियो तयार हुँदैछ',
    stageTranscribing: 'ट्रान्सक्राइब हुँदैछ',
    stageDone: 'सम्पन्न',
    elapsed: 'बितेको समय',
    copied: 'प्रतिलिपि क्लिपबोर्डमा कपी भयो।',
    segmentsUnit: n => `${n} खण्ड`,
    errDecode: 'त्यो अडियो फाइल डिकोड गर्न सकिएन। अर्को फाइल प्रयास गर्नुहोस्।',
    errModel: 'मोडेल लोड गर्न सकिएन। इन्टरनेट जाँच गर्नुहोस् र पुन: प्रयास गर्नुहोस्।',
    errTranscribe: 'ट्रान्सक्रिप्सन असफल भयो। सानो मोडेलसँग पुन: प्रयास गर्नुहोस्।',
  },
};

let lang = 'en';
const t = k => STR[lang][k];

function setLang(next) {
  lang = next;
  document.documentElement.lang = next === 'ne' ? 'ne' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = STR[next][key];
    if (typeof val === 'string') el.innerHTML = val;
  });
  document.getElementById('lang-en').classList.toggle('active', next === 'en');
  document.getElementById('lang-ne').classList.toggle('active', next === 'ne');
  updateSegCount();
}
document.getElementById('lang-en').addEventListener('click', () => setLang('en'));
document.getElementById('lang-ne').addEventListener('click', () => setLang('ne'));

/* --------------------------------- helpers -------------------------------- */
const $ = id => document.getElementById(id);
const pad = (n, w = 2) => String(n).padStart(w, '0');

function fmtDisplay(sec) {
  sec = Math.max(0, sec);
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${m}:${pad(s)}`;
}
function fmtSRT(sec) {
  sec = Math.max(0, sec);
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60), ms = Math.floor((sec % 1) * 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}
function fmtVTT(sec) {
  return fmtSRT(sec).replace(',', '.');
}
function fmtDur(sec) {
  const m = Math.floor(sec / 60), s = Math.round(sec % 60);
  return `${m}:${pad(s)}`;
}
function fmtSize(bytes) {
  return bytes > 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
function download(name, text, mime) {
  const blob = new Blob([text], { type: mime });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

/* ------------------------------- file intake ------------------------------ */
let audioFile = null, audioURL = null, segments = [];

const dropzone = $('dropzone'), fileInput = $('file-input');

dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); } });
['dragenter', 'dragover'].forEach(ev => dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.add('dragging'); }));
['dragleave', 'drop'].forEach(ev => dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.remove('dragging'); }));
dropzone.addEventListener('drop', e => {
  const f = e.dataTransfer.files && e.dataTransfer.files[0];
  if (f) setFile(f);
});
fileInput.addEventListener('change', () => { if (fileInput.files[0]) setFile(fileInput.files[0]); });

$('change-file').addEventListener('click', () => fileInput.click());

// Sample clip: only show the button if the bundled sample exists.
fetch('assets/sample-nepali.mp3', { method: 'HEAD' }).then(r => {
  if (r.ok) {
    $('sample-btn').hidden = false;
  } else {
    $('sample-btn').hidden = true;
  }
}).catch(() => { $('sample-btn').hidden = true; });
$('sample-btn').hidden = true;

$('sample-btn').addEventListener('click', async () => {
  const r = await fetch('assets/sample-nepali.mp3');
  const blob = await r.blob();
  setFile(new File([blob], 'sample-nepali.mp3', { type: 'audio/mpeg' }));
});

async function setFile(file) {
  audioFile = file;
  if (audioURL) URL.revokeObjectURL(audioURL);
  audioURL = URL.createObjectURL(file);
  $('player').src = audioURL;
  $('file-name').textContent = file.name;
  $('file-size').textContent = fmtSize(file.size);
  $('file-duration').textContent = '…';
  $('job-card').hidden = false;
  $('results-card').hidden = true;
  $('error-box').hidden = true;
  segments = [];
  // Peek duration via a temp audio element.
  const tmp = document.createElement('audio');
  tmp.preload = 'metadata';
  tmp.src = audioURL;
  tmp.onloadedmetadata = () => { $('file-duration').textContent = fmtDur(tmp.duration); };
  $('job-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ------------------------------ audio decode ------------------------------ */
async function resampleTo16k(data, srcRate) {
  if (srcRate === 16000) return data;
  const off = new OfflineAudioContext(1, Math.max(1, Math.floor(data.length * 16000 / srcRate)), 16000);
  const tmpBuf = off.createBuffer(1, data.length, srcRate);
  tmpBuf.getChannelData(0).set(data);
  const src = off.createBufferSource();
  src.buffer = tmpBuf;
  src.connect(off.destination);
  src.start();
  const rendered = await off.startRendering();
  return rendered.getChannelData(0);
}

async function decodeTo16k(file) {
  const buf = await file.arrayBuffer();
  const AC = window.AudioContext || window.webkitAudioContext;
  let ctx = null, decoded = null;
  try {
    ctx = new AC({ sampleRate: 16000 });
    decoded = await ctx.decodeAudioData(buf.slice(0));
  } catch (e) {
    try { ctx && ctx.close(); } catch (_) {}
    ctx = new AC();
    decoded = await ctx.decodeAudioData(buf.slice(0));
  }
  try {
    // Some browsers ignore the sampleRate hint; resample when needed.
    return await resampleTo16k(decoded.getChannelData(0), decoded.sampleRate);
  } finally {
    try { ctx.close(); } catch (_) {}
  }
}

/* ------------------------------ transcription ----------------------------- */
let transcriber = null, loadedModelId = null;

function setProgress(stage, frac, sub) {
  $('progress-wrap').hidden = false;
  $('progress-stage').textContent = stage;
  const fill = $('progress-fill');
  if (frac == null) {
    fill.classList.add('indeterminate');
  } else {
    fill.classList.remove('indeterminate');
    fill.style.width = `${Math.round(frac * 100)}%`;
  }
  $('progress-sub').textContent = sub || '';
}

async function ensureModel(modelId) {
  if (transcriber && loadedModelId === modelId) return;
  transcriber = null; loadedModelId = null;

  const fileProg = {};
  const onProgress = p => {
    if (p.status === 'progress' && p.file) {
      fileProg[p.file] = (p.loaded || 0) / (p.total || 1);
      const files = Object.keys(fileProg);
      const avg = files.reduce((a, f) => a + fileProg[f], 0) / Math.max(1, files.length);
      setProgress(`${t('stageDownload')} — ${Math.round(avg * 100)}%`, avg, p.file.split('/').pop());
    } else if (p.status === 'done') {
      setProgress(t('stageDownload'), 1, '');
    }
  };

  const preferWebGPU = !!navigator.gpu;
  const attempts = preferWebGPU
    ? [{ device: 'webgpu', dtype: 'fp16' }, { device: 'wasm', dtype: 'q8' }, { device: 'wasm', dtype: 'fp32' }]
    : [{ device: 'wasm', dtype: 'q8' }, { device: 'wasm', dtype: 'fp32' }];

  let lastErr = null;
  for (const opts of attempts) {
    try {
      setProgress(`${t('stageDownload')} (${opts.device})`, 0, modelId);
      transcriber = await pipeline('automatic-speech-recognition', modelId, {
        device: opts.device,
        dtype: opts.dtype,
        progress_callback: onProgress,
      });
      loadedModelId = modelId;
      return;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('model load failed');
}

$('transcribe-btn').addEventListener('click', async () => {
  if (!audioFile) return;
  const btn = $('transcribe-btn');
  btn.disabled = true;
  $('error-box').hidden = true;
  let timer = null;
  try {
    setProgress(t('stageDecode'), null, '');
    const audio = await decodeTo16k(audioFile);
    if (!audio || audio.length < 1600) throw new Error(t('errDecode'));

    const modelId = $('model-select').value;
    await ensureModel(modelId);

    setProgress(t('stageTranscribing'), null, '');
    const started = Date.now();
    timer = setInterval(() => {
      const s = Math.floor((Date.now() - started) / 1000);
      $('progress-sub').textContent = `${t('elapsed')}: ${fmtDur(s)}`;
    }, 500);

    const out = await transcriber(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      return_timestamps: true,
      language: 'nepali',
      task: 'transcribe',
    });

    clearInterval(timer); timer = null;
    const raw = (out.chunks || [])
      .filter(c => c && c.text && c.text.trim().length > 0 && Array.isArray(c.timestamp))
      .map(c => ({ start: Math.max(0, c.timestamp[0] || 0), end: Math.max(0, c.timestamp[1] || 0), text: c.text.trim() }));
    // Fallback: some models return plain text without chunks for very short clips.
    segments = raw.length ? raw
      : (out.text && out.text.trim() ? [{ start: 0, end: audio.length / 16000, text: out.text.trim() }] : []);

    setProgress(`${t('stageDone')} — ${t('segmentsUnit')(segments.length)}`, 1, '');
    renderSegments();
    $('results-card').hidden = false;
    setTimeout(() => { $('progress-wrap').hidden = true; }, 1200);
    $('results-card').scrollIntoView({ behavior: 'smooth' });
  } catch (e) {
    if (timer) clearInterval(timer);
    console.error(e);
    const box = $('error-box');
    const msg = String((e && e.message) || e);
    box.textContent = /decode|arraybuffer/i.test(msg) ? t('errDecode')
      : /fetch|network|model|weight/i.test(msg) ? t('errModel')
      : t('errTranscribe');
    box.hidden = false;
    $('progress-wrap').hidden = true;
  } finally {
    btn.disabled = false;
  }
});

/* --------------------------------- results -------------------------------- */
function updateSegCount() {
  $('seg-count').textContent = segments.length ? `· ${t('segmentsUnit')(segments.length)}` : '';
}

function renderSegments() {
  const list = $('segments');
  list.innerHTML = '';
  segments.forEach((s, i) => {
    const li = document.createElement('li');
    li.className = 'segment';
    li.dataset.i = i;

    const tc = document.createElement('button');
    tc.type = 'button';
    tc.className = 'tc';
    tc.textContent = fmtDisplay(s.start);
    tc.title = `${fmtSRT(s.start)} → ${fmtSRT(s.end)}`;
    tc.addEventListener('click', () => {
      const p = $('player');
      p.currentTime = Math.max(0, s.start - 0.05);
      p.play().catch(() => {});
    });

    const p = document.createElement('p');
    p.className = 'seg-text';
    const idx = document.createElement('span');
    idx.className = 'seg-index';
    idx.textContent = `${i + 1}.`;
    p.appendChild(idx);
    p.appendChild(document.createTextNode(s.text));
    p.title = t('seekHint');
    p.addEventListener('dblclick', () => {
      p.contentEditable = 'true';
      p.focus();
      document.execCommand && document.execCommand('selectAll', false, null);
    });
    const commit = () => {
      if (p.contentEditable !== 'true') return;
      p.contentEditable = 'false';
      const txt = p.textContent.replace(/^\s*\d+\.\s*/, '').trim();
      s.text = txt || s.text;
      renderSegments();
    };
    p.addEventListener('blur', commit);
    p.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); p.blur(); }
      if (e.key === 'Escape') { p.contentEditable = 'false'; renderSegments(); }
    });

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'seg-del';
    del.textContent = '✕';
    del.setAttribute('aria-label', 'Delete segment');
    del.addEventListener('click', () => {
      segments.splice(i, 1);
      renderSegments();
    });

    li.appendChild(tc);
    li.appendChild(p);
    li.appendChild(del);
    list.appendChild(li);
  });
  updateSegCount();
}

$('player').addEventListener('timeupdate', () => {
  const time = $('player').currentTime;
  let active = -1;
  for (let i = 0; i < segments.length; i++) {
    if (time >= segments[i].start && time < segments[i].end) { active = i; break; }
  }
  document.querySelectorAll('.segment').forEach((el, i) => {
    const on = i === active;
    if (on && !el.classList.contains('active')) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    el.classList.toggle('active', on);
  });
});

/* --------------------------------- exports -------------------------------- */
function baseName() {
  return (audioFile ? audioFile.name : 'transcript').replace(/\.[^.]+$/, '') || 'transcript';
}
function toSRT() {
  return segments.map((s, i) =>
    `${i + 1}\n${fmtSRT(s.start)} --> ${fmtSRT(s.end)}\n${s.text}\n`
  ).join('\n');
}
function toVTT() {
  return 'WEBVTT\n\n' + segments.map(s =>
    `${fmtVTT(s.start)} --> ${fmtVTT(s.end)}\n${s.text}\n`
  ).join('\n');
}
function toTXT() {
  return segments.map(s => `[${fmtDisplay(s.start)}] ${s.text}`).join('\n');
}
function toJSON() {
  return JSON.stringify({ file: audioFile && audioFile.name, language: 'ne', segments }, null, 2);
}

$('dl-srt').addEventListener('click', () => download(`${baseName()}.srt`, toSRT(), 'text/plain;charset=utf-8'));
$('dl-vtt').addEventListener('click', () => download(`${baseName()}.vtt`, toVTT(), 'text/vtt;charset=utf-8'));
$('dl-txt').addEventListener('click', () => download(`${baseName()}.txt`, toTXT(), 'text/plain;charset=utf-8'));
$('dl-json').addEventListener('click', () => download(`${baseName()}.json`, toJSON(), 'application/json;charset=utf-8'));

$('copy-btn').addEventListener('click', async () => {
  const text = toTXT();
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  const btn = $('copy-btn');
  const orig = btn.textContent;
  btn.textContent = t('copied');
  setTimeout(() => { btn.textContent = orig; }, 1800);
});

$('clear-btn').addEventListener('click', () => {
  segments = [];
  renderSegments();
  $('results-card').hidden = true;
  $('progress-wrap').hidden = true;
  if (audioURL) { URL.revokeObjectURL(audioURL); audioURL = null; }
  audioFile = null;
  fileInput.value = '';
  $('job-card').hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

setLang('en');
updateSegCount();
