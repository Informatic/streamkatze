#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');

const outfile = process.argv[2];
const appinfo = JSON.parse(fs.readFileSync('assets/appinfo.json'));
const ipkfile = `${appinfo.id}_${appinfo.version}_all.ipk`;
const ipkhash = crypto
  .createHash('sha256')
  .update(fs.readFileSync(ipkfile))
  .digest('hex');

fs.writeFileSync(
  outfile,
  JSON.stringify({
    id: appinfo.id,
    version: appinfo.version,
    type: appinfo.type,
    title: appinfo.title,
    appDescription: appinfo.appDescription,
    iconUri:
      'https://raw.githubusercontent.com/informatic/streamkatze/main/assets/icon130.png',
    sourceUrl: 'https://github.com/informatic/streamkatze',
    rootRequired: true,
    ipkUrl: ipkfile,
    ipkHash: {
      sha256: ipkhash,
    },
  })
);
