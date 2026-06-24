// =========================================================
// General section configuration
// One entry per sub-page (Grammar / Phonics / Reading).
// Created by T. Wad Refae
// =========================================================
import { GENERAL_SUBSECTIONS } from '../utils/constants';

// `subsection` is the value stored on lesson documents (used to filter
// which lessons belong here). `slug` is the URL segment used in the route.
// They differ for Phonics on purpose: existing lessons are tagged with the
// value "pronunciation", so we keep that for data while exposing the nicer
// /general/phonics URL. To customise a section, edit its entry below
// (title, emoji, or a wide hero banner image).
export const GENERAL_SECTIONS = {
  grammar: {
    subsection: GENERAL_SUBSECTIONS.GRAMMAR,
    slug: 'grammar',
    titleKey: 'general.grammar',
    emoji: '📝',
    bannerImage: '/grammar-hero.png',
  },
  phonics: {
    subsection: GENERAL_SUBSECTIONS.PRONUNCIATION,
    slug: 'phonics',
    titleKey: 'general.pronunciation',
    emoji: '🔤',
    bannerImage: null,
  },
  reading: {
    subsection: GENERAL_SUBSECTIONS.READING,
    slug: 'reading',
    titleKey: 'general.reading',
    emoji: '📖',
    bannerImage: '/reading-hero.png',
  },
};

// Ordered list used by the /general landing page to render the chooser cards.
export const GENERAL_SECTION_LIST = [
  GENERAL_SECTIONS.grammar,
  GENERAL_SECTIONS.phonics,
  GENERAL_SECTIONS.reading,
];
