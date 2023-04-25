import { decodeToken } from "./functions";

const isAuth = (auth) => {
  let token = auth;
  let user;
  if (token) {
    user = decodeToken(token);
    if (Date.now() <= user.exp * 1000) {
      return true;
    } else if (Date.now() >= user.exp * 1000) {
      window.location.replace("/login");
      return false;
    }
  }
};

export { isAuth };
