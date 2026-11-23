// Server-only: the graded item banks the ClewQuest routes check against (same sets the app serves).
import { itemIndex } from "@/lib/learningGrade";
import { WA1_PRACTICE_SETS } from "@/data/p3/english/wa1_practice";
import { WA1_ZH_PRACTICE } from "@/data/p3/chinese/wa1_practice";
import WA1_ZH_DRILL from "@/data/p3/chinese/wa1_drill";

export const SUBJECT_KEYS = ["english", "chinese"];
export const SETS = { english: () => WA1_PRACTICE_SETS, chinese: () => [...WA1_ZH_PRACTICE, ...(WA1_ZH_DRILL || [])] };
export const bankFor = (subject) => itemIndex(subject === "chinese" ? "Chinese" : "English", SETS[subject]);
