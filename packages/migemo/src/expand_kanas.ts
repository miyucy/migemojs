import { romkan, expandConsonant, isConsonant } from "romkan";

function tail3(string: string, data: Array<{ last: string, head: string, consonant: boolean }> = []) {
  if (data.length < 3) {
    const match = string.match(/^(.*)(.)$/);
    if (match) {
      const datum = {
        last: match[2],
        head: match[1],
        consonant: isConsonant(match[2])
      };
      return tail3(datum.head, [...data, datum]);
    }
  }
  return data;
}

export default function expandKanas(pattern: string) {
  const result = [];
  const kana = romkan(`${pattern}`.toLowerCase());
  const data = tail3(kana);

  if (data.length === 0) {
    return result;
  }

  if (data[0].consonant) {
    if (data.length >= 2 && data[1].consonant) {
      if (data[0].last === data[1].last) {
        // special case 2
        // `nodd' => (のっ)
        result.push(`${data[1].head}っ`);
      } else if (data.length === 3 && data[1].last === data[2].last) {
        // special case 5
        // `essy' => (えっしゃ えっしゅ えっしょ)
        result.push(...expandConsonant(data[1].last + data[0].last).map(n => `${data[2].head}っ${romkan(n)}`));
      } else {
        result.push(...expandConsonant(data[1].last + data[0].last).map(n => `${data[1].head}${romkan(n)}`));
      }
    } else {
      const match = pattern.match(/^(.*?)(n?)ny$/);
      if (match && match[2] === "") {
        // special case 6
        // `ny'   => (にゃ にゅ にょ)
        result.push(...expandConsonant("ny").map(n => `${match[1]}${romkan(n)}`));
      } else {
        const deriv = expandConsonant(data[0].last);
        deriv.push("xtsu");
        if (data[0].last === "c") {
          // special case 3
          // `doc'  => (どっ どち)
          deriv.push("chi");
        } else if (data[0].last === "x") {
          // special case 4
          // `dox'  => (どっ どゃ どゅ どょ)
          deriv.push("xya", "xyu", "xyo", "xwa");
        }
        result.push(...deriv.map(n => `${data[0].head}${romkan(n)}`));
      }
    }
  } else if (data[0].last === "ん") {
    // special case 1
    // `don'  => (どん どな どに どぬ どね どの どっ)
    result.push(kana, `${data[0].head}っ`, ...expandConsonant("n").map(n => {
      return romkan(`${data[0].head}${n}`);
    }));
  } else {
    result.push(kana);
  }

  return result;
}
