/* Build duoyinzi_cursor.json from wa1_zh_complete.json (7 target sets).
   Deep-copies the target sets and applies duoyinzi edits to exactly one
   PinyinMcq item per set. Does NOT overwrite wa1_zh_complete.json. */
'use strict';
const fs = require('fs');

const all = JSON.parse(fs.readFileSync('./wa1_zh_complete.json', 'utf8'));
const pick = (id) => JSON.parse(JSON.stringify(all.find(s => s.setId === id)));

const LQ = '\u201C'; // left curly quote
const RQ = '\u201D'; // right curly quote
const q = (s) => LQ + s + RQ;

function compose(why, tip) { return why + ' ' + tip; }

function setPinyinItem(set, itemId, item) {
  const sec = set.plan.find(p => p.type === 'PinyinMcq');
  const idx = sec.items.findIndex(x => x.id === itemId);
  if (idx < 0) throw new Error('item not found: ' + itemId);
  item.explanation = compose(item.explain.why, item.explain.memoryTip);
  sec.items[idx] = item;
}

const out = [];

/* ===================== ZS06 (helping others) — replace B4 with 教 (jiao) · answer=1 ===================== */
{
  const s = pick('ZS06');
  const why = q('教我做题') + '的' + q('教') + '是动词，读 jiāo（第一声）。' + q('教') + '是多音字：读 jiào 时用于' + q('教育、教师') + '。';
  const tip = q('教') + '：动词' + q('教书、教我') + '读 jiāo；名词' + q('教育、教师') + '读 jiào。';
  setPinyinItem(s, 'ZS06_B4', {
    id: 'ZS06_B4', topic: 'PinyinMcq',
    sentence: '老师耐心地{u}教{/u}我做数学题，我很感激。',
    options: ['jiào', 'jiāo', 'jiǎo', 'xiào'],
    answer: 1, lesson: 2, skill: 'duoyinzi',
    explain: {
      why,
      distractors: [
        q('教') + '读 jiào 时用于' + q('教育、教师') + '，这里是动词。',
        '\u2713 正确答案：动词' + q('教我做题') + '的' + q('教') + '读 jiāo（第一声）。',
        q('脚、角') + '的读音，不是' + q('教') + '。',
        q('笑、校') + '的读音，不是' + q('教') + '。',
      ],
      trapType: 'duoyinzi', memoryTip: tip,
    },
  });
  out.push(s);
}

/* ===================== ZS14 (family and friends) — re-tag B2 答应 (应 ying/ying) · answer=2 ===================== */
{
  const s = pick('ZS14');
  const why = q('答应') + '表示同意别人的请求。' + q('应') + '是多音字：这里读 yìng（第四声）；读 yīng 时用于' + q('应该') + '。';
  const tip = q('应') + '：应该读 yīng；答应、回应读 yìng（第四声）。';
  setPinyinItem(s, 'ZS14_B2', {
    id: 'ZS14_B2', topic: 'PinyinMcq',
    sentence: '爷爷{u}答应{/u}带我去动物园，我非常高兴。',
    options: ['dā yīng', 'dá yīng', 'dā yìng', 'dá yìng'],
    answer: 2, lesson: 1, skill: 'duoyinzi',
    explain: {
      why,
      distractors: [
        q('应') + '在' + q('答应') + '里读 yìng（第四声）；读 yīng 用于' + q('应该') + '。',
        q('答') + '在' + q('答应') + '里读 dā（不读 dá），' + q('应') + '也应读 yìng。',
        '\u2713 正确答案：' + q('答应') + '的' + q('应') + '是多音字，这里读 yìng（第四声），' + q('答') + '读 dā。',
        q('答') + '在' + q('答应') + '里读 dā，不读 dá。',
      ],
      trapType: 'duoyinzi', memoryTip: tip,
    },
  });
  out.push(s);
}

/* ===================== ZS15 (my companions) — re-tag B3 好朋友 (好 hao/hao) · answer=3 ===================== */
{
  const s = pick('ZS15');
  const why = q('好朋友') + '的' + q('好') + '表示美好、亲密。' + q('好') + '是多音字：这里读 hǎo（第三声）；读 hào 时表示喜爱，如' + q('好奇、爱好') + '。';
  const tip = q('好') + '：好人、好朋友读 hǎo；好奇、爱好读 hào。';
  setPinyinItem(s, 'ZS15_B3', {
    id: 'ZS15_B3', topic: 'PinyinMcq',
    sentence: '小杰{u}好朋友{/u}很多，大家都喜欢和他玩。',
    options: ['hào péng yǒu', 'hǎo pén yǒu', 'hào pén yǒu', 'hǎo péng yǒu'],
    answer: 3, lesson: 1, skill: 'duoyinzi',
    explain: {
      why,
      distractors: [
        q('好') + '在' + q('好朋友') + '里读 hǎo（第三声）；读 hào 用于' + q('好奇、爱好') + '。',
        q('朋') + '应读 péng，不读 pén。',
        q('好') + '应读 hǎo，' + q('朋') + '应读 péng，两处都错。',
        '\u2713 正确答案：' + q('好朋友') + '的' + q('好') + '是多音字，这里表示美好，读 hǎo（第三声）。',
      ],
      trapType: 'duoyinzi', memoryTip: tip,
    },
  });
  out.push(s);
}

/* ===================== ZS24 (a small kindness) — replace B4 with 重 (zhong/chong) · answer=0 ===================== */
{
  const s = pick('ZS24');
  const why = '表示重量的' + q('不重') + '的' + q('重') + '读 zhòng（第四声）。' + q('重') + '是多音字：读 chóng 时表示' + q('重复、重新') + '。';
  const tip = q('重') + '：重量、很重读 zhòng；重复、重新读 chóng。';
  setPinyinItem(s, 'ZS24_B4', {
    id: 'ZS24_B4', topic: 'PinyinMcq',
    sentence: '这份礼物虽然不{u}重{/u}，却让他非常感动。',
    options: ['zhòng', 'chóng', 'zhǒng', 'chōng'],
    answer: 0, lesson: 2, skill: 'duoyinzi',
    explain: {
      why,
      distractors: [
        '\u2713 正确答案：表示重量' + q('不重') + '的' + q('重') + '读 zhòng（第四声）。',
        q('重') + '读 chóng 时表示' + q('重复、重新') + '。',
        q('种') + '的读音，不是' + q('重') + '。',
        q('冲') + '的读音，不是' + q('重') + '。',
      ],
      trapType: 'duoyinzi', memoryTip: tip,
    },
  });
  out.push(s);
}

/* ===================== ZS39 (my companions) — replace B3 with 分 (fen/fen) · answer=1 ===================== */
{
  const s = pick('ZS39');
  const why = q('分工、分开') + '的' + q('分') + '读 fēn（第一声）。' + q('分') + '是多音字：读 fèn 时用于' + q('一份、身份、分外') + '。';
  const tip = q('分') + '：分开、分工读 fēn；一份、身份读 fèn。';
  setPinyinItem(s, 'ZS39_B3', {
    id: 'ZS39_B3', topic: 'PinyinMcq',
    sentence: '我们几个好朋友{u}分{/u}工合作，很快就完成了任务。',
    options: ['fèn', 'fēn', 'fēng', 'fěn'],
    answer: 1, lesson: 2, skill: 'duoyinzi',
    explain: {
      why,
      distractors: [
        q('分') + '读 fèn 时用于' + q('一份、身份') + '。',
        '\u2713 正确答案：' + q('分工、分开') + '的' + q('分') + '读 fēn（第一声）。',
        q('风、封') + '的读音，不是' + q('分') + '。',
        q('粉') + '的读音，不是' + q('分') + '。',
      ],
      trapType: 'duoyinzi', memoryTip: tip,
    },
  });
  out.push(s);
}

/* ===================== ZS47 (rainy day) — replace B4 with 觉 (jue/jiao) · answer=2 ===================== */
{
  const s = pick('ZS47');
  const why = q('觉得、感觉') + '的' + q('觉') + '读 jué。' + q('觉') + '是多音字：读 jiào 时用于' + q('睡觉') + '。';
  const tip = q('觉') + '：觉得、感觉读 jué；睡觉读 jiào。';
  setPinyinItem(s, 'ZS47_B4', {
    id: 'ZS47_B4', topic: 'PinyinMcq',
    sentence: '下雨天，我{u}觉{/u}得待在家里看书最舒服。',
    options: ['jiào', 'zhào', 'jué', 'xué'],
    answer: 2, lesson: 3, skill: 'duoyinzi',
    explain: {
      why,
      distractors: [
        q('觉') + '读 jiào 时用于' + q('睡觉') + '。',
        q('照') + '的读音，不是' + q('觉') + '。',
        '\u2713 正确答案：' + q('觉得、感觉') + '的' + q('觉') + '读 jué。',
        q('学') + '的读音，不是' + q('觉') + '。',
      ],
      trapType: 'duoyinzi', memoryTip: tip,
    },
  });
  out.push(s);
}

/* ===================== ZS49 (wishes and dreams) — re-tag B2 长大 (长 zhang/chang) · answer=3 ===================== */
{
  const s = pick('ZS49');
  const why = q('长大') + '表示慢慢长高、成长。' + q('长') + '是多音字：这里读 zhǎng（第三声）；读 cháng 时表示长短、很长。';
  const tip = q('长') + '：长大、长辈读 zhǎng；长短、很长读 cháng。';
  setPinyinItem(s, 'ZS49_B2', {
    id: 'ZS49_B2', topic: 'PinyinMcq',
    sentence: '小华{u}长大{/u}后想当一名消防员。',
    options: ['cháng dà', 'zhǎng dài', 'cháng dài', 'zhǎng dà'],
    answer: 3, lesson: 1, skill: 'duoyinzi',
    explain: {
      why,
      distractors: [
        q('长') + '在' + q('长大') + '里读 zhǎng；读 cháng 时表示长短的长。',
        q('大') + '读 dà，不读 dài。',
        q('长') + '应读 zhǎng，' + q('大') + '应读 dà，两处都错。',
        '\u2713 正确答案：' + q('长大') + '的' + q('长') + '是多音字，表示生长，读 zhǎng（第三声）。',
      ],
      trapType: 'duoyinzi', memoryTip: tip,
    },
  });
  out.push(s);
}

/* order: ZS06, ZS14, ZS15, ZS24, ZS39, ZS47, ZS49 (already push order) */
fs.writeFileSync('duoyinzi_cursor.json', JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote duoyinzi_cursor.json with', out.length, 'sets:', out.map(s => s.setId).join(', '));
