const path = require("path");
const fs = require("fs");

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
}

function readImageData(filePath) {
  const absolutePath = path.join(__dirname, filePath);
  const imageData = fs.readFileSync(absolutePath);
  return imageData;
}

function getContentType(fileExtension) {
  switch (fileExtension) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    // Add more supported file extensions as needed
    default:
      return null;
  }
}

module.exports = {
  deleteFile,
  readImageData,
  getContentType,
};
