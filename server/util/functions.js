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

function calculateSweetPrices(sweets) {
  const currentDate = new Date();
  const sweetPrices = sweets.map((sweet) => {
    const daysElapsed = Math.floor(
      (currentDate - sweet.createdAt) / (24 * 60 * 60 * 1000)
    );
    let discountedPrice;
    if (daysElapsed === 0) {
      discountedPrice = sweet.price;
    } else if (daysElapsed === 1) {
      discountedPrice = sweet.price * 0.8;
    } else if (daysElapsed === 2) {
      discountedPrice = sweet.price * 0.2;
    } else {
      discountedPrice = 0;
    }
    return {
      sweetName: sweet.sweetName,
      sweetQuantity: sweet.sweetQuantity,
      price: sweet.price,
      description: sweet.description,
      category: sweet.category,
      slug: sweet.slug,
      imageUrl: sweet.imageUrl,
      ingredients: sweet.ingredients,
      createdAt: sweet.createdAt,
      discountedPrice,
    };
  });
  return sweetPrices;
}

module.exports = {
  deleteFile,
  readImageData,
  getContentType,
  calculateSweetPrices,
};
