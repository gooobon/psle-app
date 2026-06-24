// ============================================================================
// P3 English Papers — Normalized Master Barrel Export
// src/data/p3/english/papers/index.ts
// Every entry is normalized to { meta, questions }.
// ============================================================================

// ── WA1 imports (24) ──
import rawTestComprehension8TypesGolden from './wa1/test_comprehension_8types_golden';
import rawMinitest1RulangPrimaryEnglish2024 from './wa1/minitest1_rulang_primary_english_2024';
import rawPaper2NanHuaPrimaryEnglish2023 from './wa1/paper2_nan_hua_primary_english_2023';
import rawPracticepaper1CatholicHighPrimaryEnglish2023 from './wa1/practicepaper1_catholic_high_primary_english_2023';
import rawPracticepaper1TaoNanEnglish2025 from './wa1/practicepaper1_tao_nan_english_2025';
import rawPracticepaper2CatholicHighPrimaryEnglish2023 from './wa1/practicepaper2_catholic_high_primary_english_2023';
import rawReview1MahaBodhiEnglish2024 from './wa1/review1_maha_bodhi_english_2024';
import rawReview1MahaBodhiEnglish2025 from './wa1/review1_maha_bodhi_english_2025';
import rawTermlyassessmentChijStNicholasGirlsEnglish2023 from './wa1/termlyassessment_chij_st_nicholas_girls_english_2023';
import rawWa1AngloChinesePrimaryEnglish2023 from './wa1/wa1_anglo_chinese_primary_english_2023';
import rawWa1CatholicHighPrimaryEnglish2022 from './wa1/wa1_catholic_high_primary_english_2022';
import rawWa1CatholicHighPrimaryEnglish2023 from './wa1/wa1_catholic_high_primary_english_2023';
import rawWa1HenryParkPrimaryEnglish2023 from './wa1/wa1_henry_park_primary_english_2023';
import rawWa1HenryParkPrimaryEnglish2024 from './wa1/wa1_henry_park_primary_english_2024';
import rawWa1HenryParkPrimaryEnglish2025 from './wa1/wa1_henry_park_primary_english_2025';
import rawWa1MahaBodhiEnglish2023 from './wa1/wa1_maha_bodhi_english_2023';
import rawWa1NanyangPrimaryEnglish2022 from './wa1/wa1_nanyang_primary_english_2022';
import rawWa1NanyangPrimaryEnglish2023 from './wa1/wa1_nanyang_primary_english_2023';
import rawWa1NanyangPrimaryEnglish2024 from './wa1/wa1_nanyang_primary_english_2024';
import rawWa1NanyangPrimaryEnglish2025 from './wa1/wa1_nanyang_primary_english_2025';
import rawWa1PeiChunEnglish2023 from './wa1/wa1_pei_chun_english_2023';
import rawWa1RafflesGirlsPrimaryEnglish2023 from './wa1/wa1_raffles_girls_primary_english_2023';
import rawWa1RafflesGirlsPrimaryEnglish2024 from './wa1/wa1_raffles_girls_primary_english_2024';
import rawWa1RafflesGirlsPrimaryEnglish2025 from './wa1/wa1_raffles_girls_primary_english_2025';
import rawWa1RosythPrimaryEnglish2023 from './wa1/wa1_rosyth_primary_english_2023';

// ── WA2 imports (23) ──
import rawWa2CatholichighEnglishpaper12023 from './wa2/wa2_catholichigh_englishpaper1_2023';
import rawWa2CatholichighEnglishpaper22023 from './wa2/wa2_catholichigh_englishpaper2_2023';
import rawWa2ChijEnglishpaper2025 from './wa2/wa2_chij_englishpaper_2025';
import rawWa2HenryparkEnglishpaper22023 from './wa2/wa2_henrypark_englishpaper2_2023';
import rawWa2HenryparkWa12024 from './wa2/wa2_henrypark_wa1_2024';
import rawWa2MahabEnglishpaper2024 from './wa2/wa2_mahab_englishpaper_2024';
import rawWa2MahabEnglishpaper2025 from './wa2/wa2_mahab_englishpaper_2025';
import rawWa2MgsEnglishpaper2022 from './wa2/wa2_mgs_englishpaper_2022';
import rawWa2MgsEnglishpaper2023 from './wa2/wa2_mgs_englishpaper_2023';
import rawWa2MgsEnglishpaper2024 from './wa2/wa2_mgs_englishpaper_2024';
import rawWa2MgsEnglishpaper2025 from './wa2/wa2_mgs_englishpaper_2025';
import rawWa2NanyangEnglishpaper2024 from './wa2/wa2_nanyang_englishpaper_2024';
import rawWa2NanyangEnglishpaper2025 from './wa2/wa2_nanyang_englishpaper_2025';
import rawWa2NanyangPrimaryEnglish2022 from './wa2/wa2_nanyang_primary_english_2022';
import rawWa2NanyangPrimaryEnglish2023 from './wa2/wa2_nanyang_primary_english_2023';
import rawWa2NanyangWa12024 from './wa2/wa2_nanyang_wa1_2024';
import rawWa2NanyangWa22024 from './wa2/wa2_nanyang_wa2_2024';
import rawWa2RafflesgirlsWa12024 from './wa2/wa2_rafflesgirls_wa1_2024';
import rawWa2RafflesgirlsprimaryEnglishpaper2023 from './wa2/wa2_rafflesgirlsprimary_englishpaper_2023';
import rawWa2RosythEnglishpaper2024 from './wa2/wa2_rosyth_englishpaper_2024';
import rawWa2RulangEnglishpaper2024 from './wa2/wa2_rulang_englishpaper_2024';
import rawWa2SthildasT2wa2024 from './wa2/wa2_sthildas_t2wa_2024';
import rawWa2TaonanEnglishpaper2023 from './wa2/wa2_taonan_englishpaper_2023';

// ── WA3 imports (8) ──
import rawWa3CatholichighPracticepaper22023 from './wa3/wa3_catholichigh_practicepaper2_2023';
import rawWa3ChijstnicholasgirlsWa32025 from './wa3/wa3_chijstnicholasgirls_wa3_2025';
import rawWa3HenryparkPracticepaper22023 from './wa3/wa3_henrypark_practicepaper2_2023';
import rawWa3NanhuaWa32023 from './wa3/wa3_nanhua_wa3_2023';
import rawWa3NanhuaWa32025 from './wa3/wa3_nanhua_wa3_2025';
import rawWa3PeihwaMinitestTerm22023 from './wa3/wa3_peihwa_minitest_term2_2023';
import rawWa3SthildasTerm2Wa2024 from './wa3/wa3_sthildas_term2_wa_2024';
import rawWa3TaonanPracticepaper32023 from './wa3/wa3_taonan_practicepaper3_2023';

// ── EOY imports (58) ──
import { acsj_eoy2022_bookletA, paperMeta } from './eoy/eoy_acsj_bookletA_2025';
import { acsj_eoy2022_bookletB, paperMetaB } from './eoy/eoy_acsj_bookletB_2025';
import { acsj_bsa2_2022, paperMetaBSA2 } from './eoy/eoy_acsj_bsa2_2025';
import { acsp_sa2_2022_bookletA, paperMetaACSP } from './eoy/eoy_acsp_bookletA_2025';
import { acsp_sa2_2022_bookletB, paperMetaACSP_B } from './eoy/eoy_acsp_bookletB_2025';
import rawEoyAcsprimaryP2a2023 from './eoy/eoy_acsprimary_p2a_2023';
import rawEoyAcsprimaryP2b2023 from './eoy/eoy_acsprimary_p2b_2023';
import { ait_eoy2020_paper2, paperMetaAIT } from './eoy/eoy_ait_eoy2020_paper2_2025';
import rawEoyAitongPaper22025 from './eoy/eoy_aitong_paper2_2025';
import rawEoyCatholichighP22025 from './eoy/eoy_catholichigh_p2_2025';
import rawEoyCatholichighPaper12025 from './eoy/eoy_catholichigh_paper1_2025';
import rawEoyCatholichighPaper22025 from './eoy/eoy_catholichigh_paper2_2025';
import { eoy_chij_p2_2025 as rawEoy_chij_p2_2025 } from './eoy/eoy_chij_p2_2025';
import rawEoyChijStNicholasP22025 from './eoy/eoy_chij_st_nicholas_p2_2025';
import { eoy_chijsng_p2_2024 as rawEoy_chijsng_p2_2024 } from './eoy/eoy_chijsng_p2_2024';
import { chij_sa2_2022_paper2, paperMetaCHIJ } from './eoy/eoy_chijtp_sa2_2022_paper2_2025';
import { chs_eoy2022_paper2, paperMetaCHS_EOY } from './eoy/eoy_chsp_eoy2022_paper2_2025';
import { chs_wa1_2022, paperMetaCHS_WA1 } from './eoy/eoy_chsp_wa1_2025';
import rawEoyHenryparkP22023 from './eoy/eoy_henrypark_p2_2023';
import { eoy_henrypark_p2_2025 as rawEoy_henrypark_p2_2025 } from './eoy/eoy_henrypark_p2_2025 (2)';
import rawEoyHenryparkP22025 from './eoy/eoy_henrypark_p2_2025';
import rawEoyHenryparkPaper22025 from './eoy/eoy_henrypark_paper2_2025';
import rawEoyMahabodhiP22025 from './eoy/eoy_mahabodhi_p2_2025';
import rawEoyMahabodhiP2a2023 from './eoy/eoy_mahabodhi_p2a_2023';
import rawEoyMahabodhiP2b2023 from './eoy/eoy_mahabodhi_p2b_2023';
import rawEoyMethodistGirlsP22025 from './eoy/eoy_methodist_girls_p2_2025';
import rawEoyMgsP22022 from './eoy/eoy_mgs_p2_2022';
import rawEoyMgsP22025 from './eoy/eoy_mgs_p2_2025';
import rawEoyMgsP2a2023 from './eoy/eoy_mgs_p2a_2023';
import rawEoyMgsP2b2023 from './eoy/eoy_mgs_p2b_2023';
import rawEoyMgsP2c2023 from './eoy/eoy_mgs_p2c_2023';
import rawEoyNanhuaP22023 from './eoy/eoy_nanhua_p2_2023';
import rawEoyNanhuaP22025 from './eoy/eoy_nanhua_p2_2025';
import rawEoyNanyangP22022 from './eoy/eoy_nanyang_p2_2022';
import rawEoyNanyangP22025 from './eoy/eoy_nanyang_p2_2025';
import rawEoyPeihwaP22022 from './eoy/eoy_peihwa_p2_2022';
import { eoy_peihwa_p2_2025 as rawEoy_peihwa_p2_2025 } from './eoy/eoy_peihwa_p2_2025';
import rawEoyPlmgsP22025 from './eoy/eoy_plmgs_p2_2025';
import rawEoyRafflesGirlsPrimaryP22025 from './eoy/eoy_raffles_girls_primary_p2_2025';
import rawEoyRafflesgirlsMockpaper2025 from './eoy/eoy_rafflesgirls_mockpaper_2025';
import { eoy_rafflesgirls_p2_2025 as rawEoy_rafflesgirls_p2_2025 } from './eoy/eoy_rafflesgirls_p2_2025';
import rawEoyRedswastikaP22022 from './eoy/eoy_redswastika_p2_2022';
import { eoy_redswastika_p2_2025 as rawEoy_redswastika_p2_2025 } from './eoy/eoy_redswastika_p2_2025';
import rawEoyRgpsP22025 from './eoy/eoy_rgps_p2_2025';
import rawEoyRosythP22022 from './eoy/eoy_rosyth_p2_2022';
import rawEoyRosythP22025 from './eoy/eoy_rosyth_p2_2025';
import { eoy_rulang_p2_2024 as rawEoy_rulang_p2_2024 } from './eoy/eoy_rulang_p2_2024';
import rawEoyScgsP22022 from './eoy/eoy_scgs_p2_2022';
import { eoy_scgs_p2_2024 as rawEoy_scgs_p2_2024 } from './eoy/eoy_scgs_p2_2024';
import { eoy_scgs_p2_2025 as rawEoy_scgs_p2_2025 } from './eoy/eoy_scgs_p2_2025';
import { eoy_sji_p2_2025 as rawEoy_sji_p2_2025 } from './eoy/eoy_sji_p2_2025';
import { eoy_sthildas_p2_2024 as rawEoy_sthildas_p2_2024 } from './eoy/eoy_sthildas_p2_2024';
import { eoy_taonan_p2_2024 as rawEoy_taonan_p2_2024 } from './eoy/eoy_taonan_p2_2024';
import { eoy_taonan_p2_2025 as rawEoy_taonan_p2_2025 } from './eoy/eoy_taonan_p2_2025';
import rawEoyTaonanPaper12025 from './eoy/eoy_taonan_paper1_2025';
import rawEoyTaonanPaper22025 from './eoy/eoy_taonan_paper2_2025';
import rawEoyTaonanPaper32025 from './eoy/eoy_taonan_paper3_2025';
import rawPracticeNanyangPrimaryPp12025 from './eoy/practice_nanyang_primary_pp1_2025';

export type NormalizedEnglishPaper = {
  meta: Record<string, unknown>;
  questions: unknown[];
};

function extractQuestions(raw: Record<string, unknown>): unknown[] {
  if (Array.isArray(raw.questions)) return raw.questions;
  if (Array.isArray(raw.items)) return raw.items;
  if (Array.isArray(raw.sections)) {
    return (raw.sections as Array<{ questions?: unknown[] }>).flatMap(
      (section) => section.questions ?? [],
    );
  }
  return [];
}

function extractMeta(raw: Record<string, unknown>): Record<string, unknown> {
  if (raw.meta && typeof raw.meta === 'object' && !Array.isArray(raw.meta)) {
    return { ...(raw.meta as Record<string, unknown>) };
  }

  const { questions, items, sections, ...rest } = raw;
  return rest;
}

export function normalizePaper(raw: unknown): NormalizedEnglishPaper {
  const data = (raw ?? {}) as Record<string, unknown>;
  return {
    meta: extractMeta(data),
    questions: extractQuestions(data),
  };
}

export const p3EnglishWA1Papers: NormalizedEnglishPaper[] = [
  normalizePaper(rawTestComprehension8TypesGolden),
  normalizePaper(rawMinitest1RulangPrimaryEnglish2024),
  normalizePaper(rawPaper2NanHuaPrimaryEnglish2023),
  normalizePaper(rawPracticepaper1CatholicHighPrimaryEnglish2023),
  normalizePaper(rawPracticepaper1TaoNanEnglish2025),
  normalizePaper(rawPracticepaper2CatholicHighPrimaryEnglish2023),
  normalizePaper(rawReview1MahaBodhiEnglish2024),
  normalizePaper(rawReview1MahaBodhiEnglish2025),
  normalizePaper(rawTermlyassessmentChijStNicholasGirlsEnglish2023),
  normalizePaper(rawWa1AngloChinesePrimaryEnglish2023),
  normalizePaper(rawWa1CatholicHighPrimaryEnglish2022),
  normalizePaper(rawWa1CatholicHighPrimaryEnglish2023),
  normalizePaper(rawWa1HenryParkPrimaryEnglish2023),
  normalizePaper(rawWa1HenryParkPrimaryEnglish2024),
  normalizePaper(rawWa1HenryParkPrimaryEnglish2025),
  normalizePaper(rawWa1MahaBodhiEnglish2023),
  normalizePaper(rawWa1NanyangPrimaryEnglish2022),
  normalizePaper(rawWa1NanyangPrimaryEnglish2023),
  normalizePaper(rawWa1NanyangPrimaryEnglish2024),
  normalizePaper(rawWa1NanyangPrimaryEnglish2025),
  normalizePaper(rawWa1PeiChunEnglish2023),
  normalizePaper(rawWa1RafflesGirlsPrimaryEnglish2023),
  normalizePaper(rawWa1RafflesGirlsPrimaryEnglish2024),
  normalizePaper(rawWa1RafflesGirlsPrimaryEnglish2025),
  normalizePaper(rawWa1RosythPrimaryEnglish2023),
];

export const p3EnglishWA2Papers: NormalizedEnglishPaper[] = [
  normalizePaper(rawWa2CatholichighEnglishpaper12023),
  normalizePaper(rawWa2CatholichighEnglishpaper22023),
  normalizePaper(rawWa2ChijEnglishpaper2025),
  normalizePaper(rawWa2HenryparkEnglishpaper22023),
  normalizePaper(rawWa2HenryparkWa12024),
  normalizePaper(rawWa2MahabEnglishpaper2024),
  normalizePaper(rawWa2MahabEnglishpaper2025),
  normalizePaper(rawWa2MgsEnglishpaper2022),
  normalizePaper(rawWa2MgsEnglishpaper2023),
  normalizePaper(rawWa2MgsEnglishpaper2024),
  normalizePaper(rawWa2MgsEnglishpaper2025),
  normalizePaper(rawWa2NanyangEnglishpaper2024),
  normalizePaper(rawWa2NanyangEnglishpaper2025),
  normalizePaper(rawWa2NanyangPrimaryEnglish2022),
  normalizePaper(rawWa2NanyangPrimaryEnglish2023),
  normalizePaper(rawWa2NanyangWa12024),
  normalizePaper(rawWa2NanyangWa22024),
  normalizePaper(rawWa2RafflesgirlsWa12024),
  normalizePaper(rawWa2RafflesgirlsprimaryEnglishpaper2023),
  normalizePaper(rawWa2RosythEnglishpaper2024),
  normalizePaper(rawWa2RulangEnglishpaper2024),
  normalizePaper(rawWa2SthildasT2wa2024),
  normalizePaper(rawWa2TaonanEnglishpaper2023),
];

export const p3EnglishWA3Papers: NormalizedEnglishPaper[] = [
  normalizePaper(rawWa3CatholichighPracticepaper22023),
  normalizePaper(rawWa3ChijstnicholasgirlsWa32025),
  normalizePaper(rawWa3HenryparkPracticepaper22023),
  normalizePaper(rawWa3NanhuaWa32023),
  normalizePaper(rawWa3NanhuaWa32025),
  normalizePaper(rawWa3PeihwaMinitestTerm22023),
  normalizePaper(rawWa3SthildasTerm2Wa2024),
  normalizePaper(rawWa3TaonanPracticepaper32023),
];

export const p3EnglishEOYPapers: NormalizedEnglishPaper[] = [
  normalizePaper({ meta: paperMeta, questions: acsj_eoy2022_bookletA }),
  normalizePaper({ meta: paperMetaB, questions: acsj_eoy2022_bookletB }),
  normalizePaper({ meta: paperMetaBSA2, questions: acsj_bsa2_2022 }),
  normalizePaper({ meta: paperMetaACSP, questions: acsp_sa2_2022_bookletA }),
  normalizePaper({ meta: paperMetaACSP_B, questions: acsp_sa2_2022_bookletB }),
  normalizePaper(rawEoyAcsprimaryP2a2023),
  normalizePaper(rawEoyAcsprimaryP2b2023),
  normalizePaper({ meta: paperMetaAIT, questions: ait_eoy2020_paper2 }),
  normalizePaper(rawEoyAitongPaper22025),
  normalizePaper(rawEoyCatholichighP22025),
  normalizePaper(rawEoyCatholichighPaper12025),
  normalizePaper(rawEoyCatholichighPaper22025),
  normalizePaper(rawEoy_chij_p2_2025),
  normalizePaper(rawEoyChijStNicholasP22025),
  normalizePaper(rawEoy_chijsng_p2_2024),
  normalizePaper({ meta: paperMetaCHIJ, questions: chij_sa2_2022_paper2 }),
  normalizePaper({ meta: paperMetaCHS_EOY, questions: chs_eoy2022_paper2 }),
  normalizePaper({ meta: paperMetaCHS_WA1, questions: chs_wa1_2022 }),
  normalizePaper(rawEoyHenryparkP22023),
  normalizePaper(rawEoy_henrypark_p2_2025),
  normalizePaper(rawEoyHenryparkP22025),
  normalizePaper(rawEoyHenryparkPaper22025),
  normalizePaper(rawEoyMahabodhiP22025),
  normalizePaper(rawEoyMahabodhiP2a2023),
  normalizePaper(rawEoyMahabodhiP2b2023),
  normalizePaper(rawEoyMethodistGirlsP22025),
  normalizePaper(rawEoyMgsP22022),
  normalizePaper(rawEoyMgsP22025),
  normalizePaper(rawEoyMgsP2a2023),
  normalizePaper(rawEoyMgsP2b2023),
  normalizePaper(rawEoyMgsP2c2023),
  normalizePaper(rawEoyNanhuaP22023),
  normalizePaper(rawEoyNanhuaP22025),
  normalizePaper(rawEoyNanyangP22022),
  normalizePaper(rawEoyNanyangP22025),
  normalizePaper(rawEoyPeihwaP22022),
  normalizePaper(rawEoy_peihwa_p2_2025),
  normalizePaper(rawEoyPlmgsP22025),
  normalizePaper(rawEoyRafflesGirlsPrimaryP22025),
  normalizePaper(rawEoyRafflesgirlsMockpaper2025),
  normalizePaper(rawEoy_rafflesgirls_p2_2025),
  normalizePaper(rawEoyRedswastikaP22022),
  normalizePaper(rawEoy_redswastika_p2_2025),
  normalizePaper(rawEoyRgpsP22025),
  normalizePaper(rawEoyRosythP22022),
  normalizePaper(rawEoyRosythP22025),
  normalizePaper(rawEoy_rulang_p2_2024),
  normalizePaper(rawEoyScgsP22022),
  normalizePaper(rawEoy_scgs_p2_2024),
  normalizePaper(rawEoy_scgs_p2_2025),
  normalizePaper(rawEoy_sji_p2_2025),
  normalizePaper(rawEoy_sthildas_p2_2024),
  normalizePaper(rawEoy_taonan_p2_2024),
  normalizePaper(rawEoy_taonan_p2_2025),
  normalizePaper(rawEoyTaonanPaper12025),
  normalizePaper(rawEoyTaonanPaper22025),
  normalizePaper(rawEoyTaonanPaper32025),
  normalizePaper(rawPracticeNanyangPrimaryPp12025),
];

export const allP3EnglishPapers = {
  wa1: p3EnglishWA1Papers,
  wa2: p3EnglishWA2Papers,
  wa3: p3EnglishWA3Papers,
  eoy: p3EnglishEOYPapers,
};
