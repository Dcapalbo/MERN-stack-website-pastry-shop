import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import classes from "./navLinks.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuth } from "../../utils/isAuth";

const NavLinks = () => {
  const { t } = useTranslation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(() => {});

  const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  const userName = useSelector((state) => state.userLogin.userName);
  const token = useSelector((state) => state.userLogin.token);

  useEffect(() => {
    setTokenExpiration(isAuth(token));
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn, token]);

  return (
    <ul className={classes.nav__links}>
      {isAuthenticated && tokenExpiration && (
        <li>
          <Link to="/admin/home">
            <FontAwesomeIcon icon={faUser} size="1x" />
          </Link>
          <p>{userName}</p>
        </li>
      )}
      <li>
        <Link to="/home">{t("home")}</Link>
      </li>
      <li>
        <Link to="/about">{t("about")}</Link>
      </li>
      <li>
        <Link to="/sign-up">{t("signUp")}</Link>
      </li>
      <li>
        <Link to="/login">{t("login")}</Link>
      </li>
      {isAuthenticated && tokenExpiration && (
        <li>
          <Link to="/admin/sweets">{t("sweetsList")}</Link>
        </li>
      )}
      {isAuthenticated && tokenExpiration && (
        <li>
          <Link to="/admin/add-new-sweet">{t("addSweet")}</Link>
        </li>
      )}
      {isAuthenticated && tokenExpiration && (
        <li>
          <Link to="/forgot-password">{t("forgotPassword")}</Link>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
