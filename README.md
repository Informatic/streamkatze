# streamkatze

Minimal [streaming.media.ccc.de](https://streaming.media.ccc.de) playback
application for webOS.

The Logo ["Voctocat"](https://morr.cc/voctocat/) is kindly provided by [Blinry](https://github.com/blinry) under CC BY-NC-SA 4.0 License.

![Main Screen](https://github.com/informatic/streamkatze/blob/main/.github/screenshots/screenshot1.png?raw=true)

## Development

```sh
npm install

# Serve development build on http://127.0.0.1:8080
npm start

# Production build (dumped into dist/)
npm run build

# Build production webOS package
npm run package

# Install webOS package
npm run deploy

# Launch
npm run launch
```

## Release engineering

Use `npm version` - this will automatically sync up `appinfo.json` version and
create version commit/tag.
