const getContentType = (fileExtension) => {
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
};

export { getContentType };
