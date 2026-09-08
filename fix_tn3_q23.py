# fix_tn3_q23.py - remove duplicate answer keys + AI self-talk in solution steps
import io, sys
P = "src/data/p3/english/papers/eoy/eoy_taonan_paper3_2025.ts"
s = io.open(P, encoding="utf-8").read()
old_head = '''          answer: "A",
          answerWord: "at",
          solution: {'''
new_head = '''          solution: {'''
old_steps_start = s.find("\"'Stood frozen at the ground'")
if old_head not in s or old_steps_start < 0: print("ABORT: anchors not found (already fixed?)"); sys.exit(1)
s = s.replace(old_head, new_head, 1)
# replace the whole steps array of this item with clean pedagogy
a = s.find("steps: [", s.find("'at a spot/location'"))
b = s.find("],", a) + 2
clean = '''steps: [
              "The sentence describes being unable to move from fear.",
              "'Frozen to the ground' (or 'rooted to the spot') is a fixed expression meaning stuck in place.",
              "'At' marks a location but does not form this expression; 'to' is the preposition the idiom uses.",
            ],'''
s = s[:a] + clean + s[b:]
s = s.replace("method: \"Preposition \\u2014 'at a spot/location'\"", "method: \"Preposition in a fixed expression: 'frozen to the ground'\"")
s = s.replace("method: \"Preposition — 'at a spot/location'\"", "method: \"Preposition in a fixed expression: 'frozen to the ground'\"")
io.open(P, "w", encoding="utf-8", newline="").write(s)
print("fixed tn3 q23: single answer G/to, clean solution")
