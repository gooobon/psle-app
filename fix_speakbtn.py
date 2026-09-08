import io
def fix(p, old, new):
    s = io.open(p, encoding="utf-8", newline="").read()
    if new in s: print("skip", p); return
    assert s.count(old) == 1, ("anchor", p, s.count(old))
    io.open(p, "w", encoding="utf-8", newline="").write(s.replace(old, new, 1)); print("fixed", p)
fix("src/app/ClaudeApp.js",
    "import { Wrap, StudentBottomNav, C, BigBtn, ErrorBox, InputField, SFX } from '@/lib/uiShared';",
    "import { Wrap, StudentBottomNav, C, BigBtn, ErrorBox, InputField, SFX, SpeakBtn } from '@/lib/uiShared';")
fix("src/lib/sessionUtils.js",
    'import { C, TTS } from "@/lib/uiShared";',
    'import { C, TTS, SpeakBtn } from "@/lib/uiShared";')
