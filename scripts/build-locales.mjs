import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function unflatten(flat) {
  const rootObj = {};
  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let node = rootObj;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!(part in node) || typeof node[part] !== "object") node[part] = {};
      node = node[part];
    }
    node[parts[parts.length - 1]] = value;
  }
  return rootObj;
}

function toTs(name, obj) {
  return `/** Auto-generated — do not edit by hand. Run: node scripts/build-locales.mjs */\nexport const ${name} = ${JSON.stringify(obj, null, 2)} as const;\n`;
}

for (const locale of ["fr", "ar"]) {
  const flat = JSON.parse(readFileSync(join(root, `scripts/${locale}-flat.json`), "utf8"));
  const nested = unflatten(flat);
  writeFileSync(join(root, `lib/i18n/${locale}.ts`), toTs(locale, nested));
  console.log("wrote", locale, Object.keys(flat).length, "keys");
}
