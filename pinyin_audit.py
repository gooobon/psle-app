# Refined pinyin audit: compare the marked answer against pypinyin's WORD-LEVEL
# (phrase) reading. Only surface items where the key differs from the standard
# word reading -> these are the genuine review candidates (context-dependent
# duoyinzi that MUST be disambiguated by the sentence, or real key errors).
import json, re, unicodedata
from pypinyin import pinyin, Style

data = json.load(open('wa1_zh_complete.json', encoding='utf-8'))

def strip_neutral(s):
    # normalize: lowercase, drop spaces for compare, keep tone marks
    return s.strip().lower()

def phrase_reading(word):
    r = pinyin(word, style=Style.TONE, heteronym=False)
    return ' '.join(x[0] for x in r)

def has_tone(sy):
    return any(unicodedata.combining(c) or c in 'āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ' for c in sy)

def word_from_sentence(sent):
    m = re.search(r'\{u\}(.*?)\{/u\}', sent)
    return m.group(1) if m else None

flags = []
checked = 0
for s in data:
    for sec in s['plan']:
        if sec['type'] != 'PinyinMcq':
            continue
        for q in sec['items']:
            word = word_from_sentence(q.get('sentence',''))
            if not word:
                continue
            checked += 1
            ans = strip_neutral(q['options'][q['answer']])
            std = strip_neutral(phrase_reading(word))
            # neutral-tone benign: compare ignoring a trailing toneless syllable diff
            if ans == std:
                continue
            # compare syllable-by-syllable, tolerate neutral-tone (toneless) variance
            a_syl, s_syl = ans.split(), std.split()
            if len(a_syl) == len(s_syl):
                benign = True
                for a, b in zip(a_syl, s_syl):
                    if a == b: continue
                    # tolerate neutral tone (one side toneless base of the other)
                    if (not has_tone(a) or not has_tone(b)):
                        # strip tone marks and compare base
                        na = unicodedata.normalize('NFD', a); na=''.join(c for c in na if not unicodedata.combining(c))
                        nb = unicodedata.normalize('NFD', b); nb=''.join(c for c in nb if not unicodedata.combining(c))
                        if na == nb: continue
                    benign = False; break
                if benign:
                    continue
            # sentence context (for disambiguation review)
            sent = re.sub(r'\{/?u\}', '', q.get('sentence',''))
            flags.append((q['id'], word, q['options'][q['answer']], phrase_reading(word), q.get('skill'), sent))

print('checked:', checked, '| key != standard word reading:', len(flags))
print('(these need a human glance: context-dependent duoyinzi are EXPECTED here;')
print(' a real error is only if the sentence does NOT justify the non-standard reading)')
print()
for f in flags:
    print('%-9s %-6s key="%s"  std="%s"  skill=%s' % (f[0], f[1], f[2], f[3], f[4]))
    print('     sent: %s' % f[5])
