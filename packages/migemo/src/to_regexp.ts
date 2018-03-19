import * as escapeRegExp from "lodash.escaperegexp";

export default function toRegExp(strings: string[]) {
  return new RegExp(strings.map(c => escapeRegExp(c)).join("|"), "gi");
}
