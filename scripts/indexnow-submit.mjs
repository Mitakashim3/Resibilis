// Usage:
//   INDEXNOW_KEY=... INDEXNOW_HOST=resibilis.vercel.app node scripts/indexnow-submit.mjs https://resibilis.vercel.app/ https://resibilis.vercel.app/pricing
//
// Notes:
// - IndexNow is free.
// - Your key must be hosted at: https://<host>/<key>.txt with the file content exactly equal to the key.
// - This script submits URLs for the host using the public IndexNow endpoint.

const key = process.env.INDEXNOW_KEY;
const host = process.env.INDEXNOW_HOST;

if (!key || !host) {
  console.error('Missing env vars: INDEXNOW_KEY and/or INDEXNOW_HOST');
  process.exit(1);
}

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error('Provide at least one URL to submit.');
  process.exit(1);
}

const keyLocation = `https://${host}/${key}.txt`;

const payload = {
  host,
  key,
  keyLocation,
  urlList: urls,
};

const endpoint = 'https://api.indexnow.org/indexnow';

const res = await fetch(endpoint, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(payload),
});

const text = await res.text().catch(() => '');

if (!res.ok) {
  console.error(`IndexNow failed: ${res.status} ${res.statusText}`);
  if (text) console.error(text);
  process.exit(1);
}

console.log(`IndexNow accepted (${res.status}).`);
if (text) console.log(text);
