/**
 * The home page's chapter sequence — ONE source of truth.
 *
 * The numerals used to be typed in at each call site, which is how the page
 * shipped a sequence that ran 02–09 with no 01 anywhere: the hero had been
 * counted as chapter 01 but carries a masthead rule, not a chapter header, so
 * the first numeral a reader ever saw was 02.
 *
 * The hero is the COVER, not a chapter. Chapters open at the first one the
 * reader actually sees, and run unbroken to the last. The interlude and the
 * closing card stay deliberately unnumbered — an interlude is the still
 * between rooms and the closer is the colophon; neither is a chapter.
 */
export const CHAPTER = {
  explore: 1,
  services: 2,
  clientele: 3,
  founder: 4,
  work: 5,
  press: 6,
  journal: 7,
  correspondence: 8,
} as const;

/** `1` → `"01"` — the chapter header's own format. */
export const chapterNum = (n: number) => String(n).padStart(2, '0');

/** `(5, 0)` → `"05.1"` — a plate's catalogue number inside its chapter. */
export const plateNum = (chapter: number, index: number) =>
  `${chapterNum(chapter)}.${index + 1}`;
