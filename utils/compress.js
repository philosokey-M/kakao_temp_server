const zlib = require('zlib');

const encodeData = (data) => {
  const jsonStr = JSON.stringify(data);
  const compressed = zlib.deflateSync(jsonStr).toString('base64url'); // base64url은 URL-safe
  return compressed;
}

const decodeData = (encoded) => {
  const buffer = Buffer.from(encoded, 'base64url');
  const jsonStr = zlib.inflateSync(buffer).toString();
  return JSON.parse(jsonStr);
}

module.exports = { encodeData, decodeData };