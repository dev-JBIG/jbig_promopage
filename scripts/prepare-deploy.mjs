import assert from "node:assert/strict";
import { cp, copyFile, mkdir, readFile, readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const clientDir = fileURLToPath(new URL("../dist/client/", import.meta.url));
const deployDir = fileURLToPath(new URL("../dist/deploy/", import.meta.url));
const recruitHtml = `${clientDir}/recruit.html`;
const html = await readFile(recruitHtml, "utf8");

assert.match(html, /<title>[^<]+<\/title>/i);
assert.match(html, /(?:href|src)="\/recruit\/assets\//i);
assert.match(html, /href="\/recruit\/favicon\.svg"/i);
assert.doesNotMatch(html, /(?:href|src)="\/assets\//i);
assert.doesNotMatch(html, /\/recruit\/recruit\//i);

await rm(deployDir, { recursive: true, force: true });
await mkdir(deployDir, { recursive: true });
await copyFile(recruitHtml, `${deployDir}/index.html`);
await copyFile(`${clientDir}/recruit.rsc`, `${deployDir}/recruit.rsc`);
await copyFile(`${clientDir}/favicon.svg`, `${deployDir}/favicon.svg`);
await cp(`${clientDir}/assets`, `${deployDir}/assets`, { recursive: true });

const recruitEntries = await readdir(`${clientDir}/recruit`, { withFileTypes: true });
for (const entry of recruitEntries) {
  if (entry.isFile() && /\.(?:html|rsc)$/.test(entry.name)) continue;
  await cp(`${clientDir}/recruit/${entry.name}`, `${deployDir}/${entry.name}`, { recursive: true });
}

console.log("Prepared nginx deployment bundle in dist/deploy/");
