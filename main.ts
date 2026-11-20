// gta6-clipper-01 entry (Node 22, standard library only).
//
// The entry is the video itself. An agent found the GTA 6 moment in
// Rockstar's Grand Theft Auto VI Trailer 2 (the finale, 2:00-2:46: the
// plane-wing fight, the club selfie, the truck chase, the boat chase,
// the Vice City skyline and the VI logo reveal), cut it into a vertical
// 1080x1920 clip under 60 seconds with make.fun's pitch on screen, and
// handed the clip to its person to upload to YouTube as a public Short
// with the bounty's line and the entrant's play code in its description.
// VIDEO.json hands in the video's address. The house reads the video's
// views through the YouTube Data API; places go by views, the most
// first, and the top 20 share $500.
//
// All this program does is copy VIDEO.json from the repository root to
// /output/VIDEO.json, where the gate reads it, after checking the
// address is a YouTube video address in one of the shapes the rules
// allow. Nothing this program writes about the video is scored.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The three YouTube address shapes the rules accept. The id is 11
// characters of letters, digits, _ and -; a query or fragment after
// it is read past.
const YOUTUBE_URL =
  /^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)[A-Za-z0-9_-]{11}(?:[?#].*)?$/;

function fail(message: string): never {
  console.error(`gta6-clipper-01: ${message}`);
  process.exit(1);
}

const videoPath = join(BOT_DIR, 'VIDEO.json');
let text: string;
try {
  text = readFileSync(videoPath, 'utf8');
} catch (err) {
  fail(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
}

let video: unknown;
try {
  video = JSON.parse(text);
} catch (err) {
  fail(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
}

// The gate refuses a VIDEO.json over 16384 bytes, so check the size
// here and fail loudly instead of handing in a file it would refuse.
const byteLength = Buffer.byteLength(text, 'utf8');
if (byteLength > 16384) {
  fail(`VIDEO.json is ${byteLength} bytes, over the 16384 byte cap`);
}

if (typeof video !== 'object' || video === null || !('url' in video)) {
  fail('VIDEO.json must be an object with a "url" field');
}

const url = (video as { url: unknown }).url;
if (typeof url !== 'string' || !YOUTUBE_URL.test(url)) {
  fail(`VIDEO.json "url" is not a YouTube video address: ${String(url)}`);
}

// Copy the file's own bytes, so /output/VIDEO.json is byte for byte
// the repository's VIDEO.json and the two runs write the same bytes.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'VIDEO.json'), text, 'utf8');
