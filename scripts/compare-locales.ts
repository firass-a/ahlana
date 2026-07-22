import { en } from "../lib/i18n/en";
import { fr } from "../lib/i18n/fr";
import { ar } from "../lib/i18n/ar";
function flat(o: any, p = ""): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(o)) {
    const key = p ? `${p}.${k}` : k;
    if (v && typeof v === "object") keys.push(...flat(v, key));
    else keys.push(key);
  }
  return keys.sort();
}
const e = flat(en);
const f = flat(fr);
const a = flat(ar);
const fs = new Set(f);
const as = new Set(a);
console.log("counts", e.length, f.length, a.length);
console.log("in en not fr", e.filter((k) => !fs.has(k)));
console.log("in en not ar", e.filter((k) => !as.has(k)));
