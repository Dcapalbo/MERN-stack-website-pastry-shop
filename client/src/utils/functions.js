const genericLength = (value) =>
  value.trim().length >= 3 && value.trim().length <= 30;

const isEmpty = (value) => value.trim() === "";

const emailCheck = (value) =>
  value.trim().length > 10 &&
  value.trim().length < 40 &&
  value.trim().includes("@");

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

export { genericLength, decodeToken, emailCheck, isEmpty, slugCreation };
