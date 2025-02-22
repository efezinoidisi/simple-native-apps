// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs');

config.resolver.assetExts.push(
  'obj',
  'dae',
  'scn',
  'zip',
  'png',
  'svg',
  'jpg',
  'glb',
  'gltf',
  'fbx',
  'lib',
  'mtl',
  'bin',
  'tif',
  'xpng',
  'xjpg',
  'xjpeg'
);

module.exports = config;
