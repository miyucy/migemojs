import toRegExp from "./to_regexp";
import HAN2ZEN from "./han2zen_data";

const HAN2ZEN_REGEXP = toRegExp(Object.keys(HAN2ZEN));

export default function han2zen(str: string) {
  return str.replace(HAN2ZEN_REGEXP, m => HAN2ZEN[m] || m);
}
