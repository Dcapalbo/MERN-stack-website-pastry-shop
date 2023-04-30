import { faFlag, faFlagUsa, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dataUserActions } from "../../store/data-user-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./navLinks.module.scss";
import { isAuth } from "../../utils/isAuth";
import i18n from "i18next";

const NavLinks = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(() => {});

  const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  const userName = useSelector((state) => state.userLogin.userName);
  const token = useSelector((state) => state.userLogin.token);

  useEffect(() => {
    setTokenExpiration(isAuth(token));
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn, token]);

  const logout = () => {
    dispatch(dataUserActions.logout());
    navigate("/login");
  };

  return (
    <ul className={classes.nav__links}>
      {isAuthenticated && tokenExpiration && (
        <li className={classes.nav__links__user__logged}>
          <Link to="/admin/home">
            <FontAwesomeIcon icon={faUser} size="1x" />
          </Link>
          <p>{userName}</p>
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
        <>
          <li>
            <Link to="/admin/sweets">{t("sweetsList")}</Link>
          </li>
          <li>
            <Link to="/admin/add-new-sweet">{t("addSweet")}</Link>
          </li>
          <li>
            <Link to="/forgot-password">{t("forgotPassword")}</Link>
          </li>
          <li>
            <p onClick={logout}>Logout</p>
          </li>
        </>
      )}
      {i18n.language === "it" ? (
        <li>
          <FontAwesomeIcon
            icon={faFlagUsa}
            onClick={() => i18n.changeLanguage("en")}
          />
        </li>
      ) : (
        <li>
          <FontAwesomeIcon
            icon={faFlag}
            onClick={() => i18n.changeLanguage("it")}
          />
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
