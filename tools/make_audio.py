"""Enregistre toutes les phrases de l'app avec des voix neuronales Kokoro (licence Apache 2.0).
Un fichier MP3 par voix et par leçon ; audio/manifest.json donne le début et la fin de chaque phrase.
Usage : python3 tools/make_audio.py <dossier contenant kokoro-v1.0.onnx et voices-v1.0.bin>"""
import json, os, re, subprocess, sys, tempfile
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

MODEL_DIR = sys.argv[1]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICES = [("af_heart", "en-us"), ("am_michael", "en-us"), ("bf_emma", "en-gb"), ("bm_george", "en-gb")]
GAP = 0.45  # silence entre deux phrases (secondes)

def spoken(t):
    t = t.replace(" / ", ", ").replace("…", "")
    return re.sub(r"\s+", " ", t).strip()

groups = json.load(open(os.path.join(ROOT, "tools", "clips.json"), encoding="utf-8"))
k = Kokoro(os.path.join(MODEL_DIR, "kokoro-v1.0.onnx"), os.path.join(MODEL_DIR, "voices-v1.0.bin"))
manifest = {"gap": GAP, "voices": [v for v, _ in VOICES], "clips": {}}
for voice, lang in VOICES:
    os.makedirs(os.path.join(ROOT, "audio", voice), exist_ok=True)
    clips = manifest["clips"][voice] = {}
    for g, texts in groups.items():
        parts, t = [], GAP
        sr = 24000
        parts.append(np.zeros(int(GAP * sr), dtype=np.float32))
        for text in texts:
            samples, sr = k.create(spoken(text), voice=voice, speed=1.0, lang=lang)
            samples = np.asarray(samples, dtype=np.float32)
            # coupe le silence du début et de la fin
            idx = np.where(np.abs(samples) > 0.01)[0]
            if len(idx): samples = samples[max(0, idx[0] - 600): idx[-1] + 1200]
            d = len(samples) / sr
            clips[text] = [g, round(t, 3), round(t + d, 3)]
            parts += [samples, np.zeros(int(GAP * sr), dtype=np.float32)]
            t += d + GAP
        wav = os.path.join(tempfile.gettempdir(), f"em-{voice}-{g}.wav")
        sf.write(wav, np.concatenate(parts), sr)
        out = os.path.join(ROOT, "audio", voice, g + ".mp3")
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-ac", "1", "-ar", "24000", "-codec:a", "libmp3lame", "-b:a", "40k", out], check=True)
        os.remove(wav)
        print(voice, g, len(texts), "phrases", round(t, 1), "s")
json.dump(manifest, open(os.path.join(ROOT, "audio", "manifest.json"), "w", encoding="utf-8"), ensure_ascii=False)
print("ok")
