import ROMAJI from "./romaji";

const ROMAJI_KEYS = Object.keys(ROMAJI);

const ROMAJI_REGEXP = new RegExp(
  ROMAJI_KEYS.filter(e => !(e === "n" || e === "n'"))
    .sort((b, a) => {
      if (a.length == b.length) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return a.length - b.length;
      }
    })
    .join("|") + "|n'|n",
  "gi"
);

const CONSONANT_REGEXP = /^[ckgszjtdhfpbmyrwxn]$/;

export function romkan(str: string): string {
  return str
    .toLowerCase()
    .replace(/nn(?![aiueo])/g, "n'")
    .replace(/n\'(?=[^aiueoyn]|$)/g, "n")
    .replace(ROMAJI_REGEXP, m => (ROMAJI[m] || m));
}

export function expandConsonant(str: string): string[] {
  const limit = str.length + 1;
  return ROMAJI_KEYS.filter(n => n.length === limit).filter(n => n.startsWith(str));
}

export function isConsonant(str: string): boolean {
  return CONSONANT_REGEXP.test(str);
}
