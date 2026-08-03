import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "images");
const outBlur = path.join(__dirname, "..", "src", "lib", "image-blur.ts");
const thumbsRoot = path.join(root, "thumbs");

const HERO = new Set(["hero/villa-lap-pool.avif"]);
const GALLERY_THUMBS = [
  "gallery/grounds-canopy.avif",
  "hero/villa-lap-pool.avif",
  "gallery/poolside-garden.avif",
  "location/lake-sunset.avif",
  "villas/bedroom-daybed.avif",
  "villas/villa-evening.avif",
  "villas/indoor-outdoor-bath.avif",
  "villas/patio-lounge.avif",
  "life/blue-loungers.avif",
  "villas/canopy-bed.avif",
  "gallery/forest-desk.avif",
  "care/garden-loungers.avif",
  "life/garden-jeep.avif",
  "gallery/activity-pavilion.avif",
];

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "thumbs") continue;
      walk(p, acc);
    } else if (/\.avif$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

function rel(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

async function optimizeOne(file) {
  const r = rel(file);
  const before = fs.statSync(file).size;
  const meta = await sharp(file).metadata();
  const isHero = HERO.has(r);
  const maxW = isHero ? 1920 : 1400;
  const quality = isHero ? 58 : 52;
  let pipeline = sharp(file).rotate();
  const width = meta.width || maxW;
  if (width > maxW) {
    pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
  }
  const buf = await pipeline
    .avif({ quality, effort: 6, chromaSubsampling: "4:2:0" })
    .toBuffer();
  if (buf.length < before * 0.98) {
    fs.writeFileSync(file, buf);
  }
  const after = fs.statSync(file).size;
  const afterMeta = await sharp(file).metadata();
  return { r, before, after, w: afterMeta.width, h: afterMeta.height };
}

async function makeThumb(relPath) {
  const src = path.join(root, relPath);
  if (!fs.existsSync(src)) return null;
  const dest = path.join(thumbsRoot, relPath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(src)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .avif({ quality: 58, effort: 6, chromaSubsampling: "4:2:0" })
    .toFile(dest);
  const after = fs.statSync(dest).size;
  return {
    relPath,
    after,
    dest: `/images/thumbs/${relPath}`,
  };
}

async function blurFor(file) {
  const buf = await sharp(file)
    .rotate()
    .resize(16, 16, { fit: "inside" })
    .webp({ quality: 20 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

const files = walk(root);
const results = [];
const blurs = {};

for (const f of files) {
  const opt = await optimizeOne(f);
  results.push(opt);
  const key = `/images/${opt.r}`;
  blurs[key] = await blurFor(f);
}

const thumbs = [];
for (const g of GALLERY_THUMBS) {
  const t = await makeThumb(g);
  if (t) {
    thumbs.push(t);
    blurs[t.dest] = await blurFor(path.join(thumbsRoot, g));
  }
}

const lines = [
  "/** Auto-generated LQIP blur data URLs for next/image. */",
  "export const blurDataURLs: Record<string, string> = {",
  ...Object.entries(blurs).map(
    ([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`,
  ),
  "};",
  "",
  "export function blurFor(src: string): string | undefined {",
  "  return blurDataURLs[src];",
  "}",
  "",
];
fs.writeFileSync(outBlur, lines.join("\n"));

console.log("=== Optimized masters ===");
let saved = 0;
for (const r of results.sort((a, b) => b.before - a.before)) {
  const delta = r.before - r.after;
  saved += Math.max(delta, 0);
  console.log(
    `${r.r}: ${Math.round(r.before / 1024)}KB -> ${Math.round(r.after / 1024)}KB (${r.w}x${r.h})`,
  );
}
console.log("Total saved masters:", Math.round(saved / 1024), "KB");
console.log("=== Gallery thumbs ===");
for (const t of thumbs) {
  console.log(`${t.relPath}: thumb ${Math.round(t.after / 1024)}KB -> ${t.dest}`);
}
console.log("Wrote", outBlur);
