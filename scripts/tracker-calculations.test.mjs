import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const manifest = JSON.parse(readFileSync(new URL('./approved-snapshot.json', import.meta.url)));
const source = readFileSync(new URL('../app/tracker/page.tsx', import.meta.url), 'utf8');
const literal = source.split('const companies: CompanyRecord[] = ')[1].split('\n];')[0] + '\n]';
const companies = Function('categories', `return ${literal}`)((scores) => scores);
test('14 public companies including Evernorth and original TQS scores', () => {
 assert.equal(companies.length, 14);
 assert.deepEqual(companies.map(c=>c.slug), manifest.rows.map(c=>c.slug));
 assert.deepEqual(companies.filter(c=>c.rating.status==='rated').map(c=>[c.rating.score,c.rating.grade]), [[84,'A'],[82,'A-'],[79,'B+'],[76,'B+']]);
 assert.equal(companies.filter(c=>c.rating.status==='pending').length,10);
});
test('every displayed value and numerical input matches approved manifest', () => {
 for (const r of manifest.rows) {
  const c=companies.find(c=>c.slug===r.slug);
  assert.equal(c.holdings,r.holdings); assert.equal(c.treasuryNav,r.navDisplay);
  assert.equal(c.holdingsAsOf ?? null, r.holdingsAsOf);
  assert.deepEqual(c.sources[0], r.source);
  assert.equal(Math.round(c.treasuryNavValue*1e9),r.nav);
  assert.equal(c.marketCap,r.capDisplay); assert.equal(Math.round(c.marketCapValue*1e9),r.cap);
  assert.equal(c.marketCapSource, r.capSource);
  assert.equal(c.mnav,r.mnav); assert.deepEqual(c.holdingInputs,r.inputs);
 }
});
test('NAV and basic mNAV reconcile to snapshot inputs', () => {
 for (const r of manifest.rows.filter(r=>r.nav)) {
  const computed=Object.entries(r.inputs).reduce((sum,[asset,quantity])=>sum+quantity*manifest.prices[asset],0);
  const delta=r.nav-computed;
  console.log(`${r.slug}: calculated NAV ${computed.toFixed(4)}, approved ${r.nav}, delta ${delta.toFixed(4)}`);
  assert.ok(Math.abs(delta)<=0.5,`${r.slug}: NAV discrepancy ${delta}`);
  assert.equal(r.mnav, (r.cap / r.nav).toFixed(2) + 'x');
 }
});
test('USD market caps reconcile to source amounts and ECB rates', () => {
 for (const row of manifest.rows) {
  const {USD, [row.capCurrency]: local} = manifest.fxPerEuro;
  assert.equal(row.cap, Math.round(row.capLocal * USD / local));
 }
});
test('pending holdings excluded, aggregate $86,415,828,211 and four assets', () => {
 assert.deepEqual(companies.filter(c=>c.holdings==='Pending verification').map(c=>c.slug), ['bitcoin-group','worksport']);
 assert.ok(companies.filter(c=>c.holdings==='Pending verification').every(c=>c.treasuryNavValue===0&&c.mnav==='Unavailable'));
 assert.equal(companies.reduce((sum,c)=>sum+Math.round(c.treasuryNavValue*1e9),0),manifest.aggregate);
 assert.equal((manifest.aggregate/1e9).toFixed(1),'86.4');
 assert.deepEqual([...new Set(companies.flatMap(c=>c.assetLabel.split(' / ')))].sort(), ['BTC','ETH','SOL','XRP']);
});

test('Tether comparison is visible and separate from the public aggregate', () => {
 assert.ok(!companies.some((company) => company.slug === 'tether'));
 assert.match(source, /id="tether"/);
 assert.match(source, /150,000 BTC/);
 assert.match(source, /100,060 BTC/);
});
