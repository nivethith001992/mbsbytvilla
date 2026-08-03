import sharp from "sharp";
import fs from "fs";
import path from "path";

const srcDir = path.join(process.cwd(), ".tmp-mbs-images", "mbs by t villa");
const outRoot = path.join(process.cwd(), "public", "images");

/** @type {Array<{ src: string, out: string, maxEdge: number, quality: number }>} */
const jobs = [
  // Hero — cinematic villa + lap pool
  {
    src: "474109714_970442171808849_3524701618923415245_n.jpg",
    out: "hero/villa-lap-pool.avif",
    maxEdge: 2200,
    quality: 68,
  },

  // About
  {
    src: "iiir.jpg",
    out: "about/pavilion-grounds.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "474207983_971019165084483_2319702501709860148_n.jpg",
    out: "about/forest-balcony.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "473660798_996732435840939_2548312739829422844_n.jpg",
    out: "about/garden-mountain.avif",
    maxEdge: 1400,
    quality: 68,
  },

  // Villas / Stay
  {
    src: "474779675_1002515518595964_6933950862518255543_n.jpg",
    out: "villas/veranda-dining.avif",
    maxEdge: 1800,
    quality: 68,
  },
  {
    src: "4536653.jpg",
    out: "villas/outdoor-dining-terrace.avif",
    maxEdge: 1800,
    quality: 68,
  },
  {
    src: "474385916_970439181809148_4915794907534702458_n.jpg",
    out: "villas/wellness-pavilion.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "474894110_1003345235179659_7353888395309565959_n.jpg",
    out: "villas/bamboo-lounge.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "474118525_971035355082864_1378800482829528404_n.jpg",
    out: "villas/canopy-bed.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "473727356_996224195891763_1477589659664385596_n.jpg",
    out: "villas/bedroom-daybed.avif",
    maxEdge: 1400,
    quality: 68,
  },
  {
    src: "473581008_996224205891762_8249631497192098473_n.jpg",
    out: "villas/window-seat.avif",
    maxEdge: 1400,
    quality: 68,
  },
  {
    src: "684791948_1329948042524925_6994472862626526315_n.jpg",
    out: "villas/indoor-outdoor-bath.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "474578154_971034961749570_6585252355534356536_n.jpg",
    out: "villas/patio-lounge.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "474593178_1003345181846331_4058584647136642227_n.jpg",
    out: "villas/villa-evening.avif",
    maxEdge: 1800,
    quality: 68,
  },

  // Care
  {
    src: "474111410_970442041808862_1168612000369968162_n.jpg",
    out: "care/garden-loungers.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "472803486_991323229715193_3499052182190449445_n.jpg",
    out: "care/spa-bathroom.avif",
    maxEdge: 1400,
    quality: 68,
  },

  // Life / wellness
  {
    src: "474326558_971034981749568_5983050935067878247_n.jpg",
    out: "life/blue-loungers.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "472842924_991281386386044_3371801151611499068_n.jpg",
    out: "life/communal-dining.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "474780114_1003344978513018_8795592353209781068_n.jpg",
    out: "life/garden-jeep.avif",
    maxEdge: 1400,
    quality: 68,
  },

  // Location
  {
    src: "684283636_1329948149191581_3710065271214666871_n.jpg",
    out: "location/lake-meadow.avif",
    maxEdge: 2000,
    quality: 68,
  },
  {
    src: "473615432_996089549238561_7271562750877624528_n.jpg",
    out: "location/lake-sunset.avif",
    maxEdge: 1600,
    quality: 68,
  },

  // Gallery extras
  {
    src: "472847451_991281063052743_2853086632212928304_n.jpg",
    out: "gallery/grounds-canopy.avif",
    maxEdge: 1400,
    quality: 68,
  },
  {
    src: "472598536_991323169715199_4154430356595254738_n.jpg",
    out: "gallery/poolside-garden.avif",
    maxEdge: 1600,
    quality: 68,
  },
  {
    src: "474595318_1002533831927466_8721492507424180355_n.jpg",
    out: "gallery/forest-desk.avif",
    maxEdge: 1400,
    quality: 68,
  },
  {
    src: "474608337_971019138417819_6234613659597177353_n.jpg",
    out: "gallery/activity-pavilion.avif",
    maxEdge: 1400,
    quality: 68,
  },
];

let totalIn = 0;
let totalOut = 0;

for (const job of jobs) {
  const input = path.join(srcDir, job.src);
  const output = path.join(outRoot, job.out);
  fs.mkdirSync(path.dirname(output), { recursive: true });

  if (!fs.existsSync(input)) {
    console.error("MISSING", job.src);
    process.exitCode = 1;
    continue;
  }

  const meta = await sharp(input).rotate().metadata();
  const w = meta.width || job.maxEdge;
  const h = meta.height || job.maxEdge;
  const longEdge = Math.max(w, h);
  const resize =
    longEdge > job.maxEdge
      ? {
          width: w >= h ? job.maxEdge : undefined,
          height: h > w ? job.maxEdge : undefined,
          fit: "inside",
          withoutEnlargement: true,
        }
      : undefined;

  // rotate() respects EXIF orientation; omitting withMetadata strips metadata
  let pipeline = sharp(input).rotate();
  if (resize) pipeline = pipeline.resize(resize);

  const info = await pipeline
    .avif({ quality: job.quality, effort: 5 })
    .toFile(output);

  const inKb = Math.round(fs.statSync(input).size / 1024);
  const outKb = Math.round(info.size / 1024);
  totalIn += inKb;
  totalOut += outKb;
  console.log(
    `${job.out}  ${info.width}x${info.height}  ${inKb}KB → ${outKb}KB`,
  );
}

console.log(`\nProcessed ${jobs.length} images. ${totalIn}KB → ${totalOut}KB`);
