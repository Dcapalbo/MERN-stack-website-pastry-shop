const decodeToken = (token) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const slugCreation = (string) => {
  return string.toLowerCase().replaceAll(" ", "-");
};

const calculateSweetPrices = (sweets) => {
  const currentDate = new Date();
  const sweetPrices = sweets.map((sweet) => {
    const daysElapsed = Math.floor(
      (currentDate - sweet.dateAdded) / (24 * 60 * 60 * 1000)
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
      name: sweet.name,
      price: sweet.price,
      discountedPrice,
    };
  });
  console.log("some error happens, no sweets found");
  return sweetPrices;
};

export { decodeToken, slugCreation, calculateSweetPrices };
