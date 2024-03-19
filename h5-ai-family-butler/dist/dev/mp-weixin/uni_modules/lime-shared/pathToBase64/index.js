"use strict";
const common_vendor = require("../../../common/vendor.js");
function isImage(extension) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  return imageExtensions.includes(extension.toLowerCase());
}
function pathToBase64(path) {
  if (/^data:/.test(path))
    return path;
  let extension = path.substring(path.lastIndexOf(".") + 1);
  const isImageFile = isImage(extension);
  let prefix = "";
  if (isImageFile) {
    prefix = "image/";
    if (extension == "svg") {
      extension += "+xml";
    }
  } else if (extension === "pdf") {
    prefix = "application/pdf";
  } else if (extension === "txt") {
    prefix = "text/plain";
  } else {
    prefix = "application/octet-stream";
  }
  return new Promise((resolve, reject) => {
    if (common_vendor.index.canIUse("getFileSystemManager")) {
      common_vendor.index.getFileSystemManager().readFile({
        filePath: path,
        encoding: "base64",
        success: (res) => {
          resolve(`data:${prefix}${extension};base64,${res.data}`);
        },
        fail: (error) => {
          console.error({ error, path });
          reject(error);
        }
      });
    }
  });
}
exports.pathToBase64 = pathToBase64;
