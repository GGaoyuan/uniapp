"use strict";
const isBase64 = (path) => {
  return /^data:image\/(\w+);base64/.test(path);
};
exports.isBase64 = isBase64;
