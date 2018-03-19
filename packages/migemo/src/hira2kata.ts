import toRegExp from "./to_regexp";
import HIRA2KATA from "./hira2kata_data";

const HIRA2KATA_REGEXP = toRegExp(Object.keys(HIRA2KATA));

export default function hira2kata(str: string) {
  return str.replace(HIRA2KATA_REGEXP, m => HIRA2KATA[m] || m);
}
