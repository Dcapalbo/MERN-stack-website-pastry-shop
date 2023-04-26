import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import classes from "./navLinks.module.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  const { t } = useTranslation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(() => {});

  return (
    <ul className={classes.nav__links}>
      {isAuthenticated && tokenExpiration && (
        <li>
          <Link to="/admin/home">
            <FontAwesomeIcon icon={faUser} size="1x" />
          </Link>
          {/* <p>{userEmail}</p> */}
        </li>
      )}
      <li>
        <Link to="/">{t("home")}</Link>
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
