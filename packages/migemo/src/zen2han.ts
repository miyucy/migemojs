import toRegExp from "./to_regexp";
import ZEN2HAN from "./zen2han_data";

const ZEN2HAN_REGEXP = toRegExp(Object.keys(ZEN2HAN));

export default function zen2han(str: string) {
  return str.replace(ZEN2HAN_REGEXP, m => ZEN2HAN[m] || m);
}
