import * as RegexTrie from "regex-trie";
import expandKanas from "./expand_kanas";
import han2zen from "./han2zen";
import zen2han from "./zen2han";
import hira2kata from "./hira2kata";

function lookupFn(pattern: string): string[] {
  return [];
}

function filterFn(patterns: string[]): string[] {
  return patterns;
}

function uniq(array: string[]): string[] {
  return array.reduce((r, e) => {
    if (!r.includes(e)) {
      r.push(e);
    }
    return r;
  }, []).sort();
}

export default function migemo(
  pattern: string, 
  lookup = lookupFn,
  filter = filterFn
) {
  const p = `${pattern}`;

  if (!lookup) {
    lookup = lookupFn;
  }

  if (!filter) {
    filter = filterFn;
  }

  if (p.length === 0) {
    return [];
  }

  const results = [p, han2zen(p), ...lookup(p)];
  expandKanas(p).forEach(hira => {
    const kata = hira2kata(hira);
    results.push(hira, kata, zen2han(kata), ...lookup(hira));
  });

  return new RegExp((new RegexTrie()).add(filter(uniq(results))).toString(), "gi");
}
