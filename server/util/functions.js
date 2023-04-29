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
    const minutesElapsed = Math.floor(
      (currentDate - sweet.createdAt) / (60 * 1000)
    );
    let discountedPrice;
    if (minutesElapsed < 1) {
      discountedPrice = sweet.price;
    } else if (minutesElapsed > 3) {
      discountedPrice = sweet.price * 0.8;
    } else if (minutesElapsed > 10) {
      discountedPrice = sweet.price * 0.2;
    } else {
      discountedPrice = 0;
    }
    return {
      sweetName: sweet.sweetName,
      sweetQuantity: sweet.sweetQuantity,
      price: sweet.price,
      discountedPrice,
      description: sweet.description,
      category: sweet.category,
      imageUrl: sweet.imageUrl,
      _id: sweet._id,
      slug: sweet.slug,
      ingredients: sweet.ingredients,
      createdAt: sweet.createdAt,
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
