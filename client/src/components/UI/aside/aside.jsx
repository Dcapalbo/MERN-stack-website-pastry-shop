import { useTranslation } from "react-i18next";
import classes from "./aside.module.scss";
import { Link } from "react-router-dom";
import React from "react";

const Aside = () => {
  const { t } = useTranslation();

  return (
    <aside className={classes.auth__aside}>
      <ul className={classes.auth__aside__nav}>
        <li>
          <p>Area personale</p>
        </li>
        <Link to="/home">
          <img
            className={classes.navigation__logo}
            src={""}
            alt="logo pastry"
            title="logo pastry"
          />
        </Link>
        <li>
          <Link to={"/home"}>{t("home")}</Link>
        </li>
        <li>
          <Link to={"/about"}>{t("about")}</Link>
        </li>
        <li>
          <Link to={"/admin/sweets"}>{t("sweetsList")}</Link>
        </li>
        <li>
          <Link to={"/admin/add-new-sweet"}>{t("addSweet")}</Link>
        </li>
        <li>
          <Link to={"/sign-up"}>{t("signUp")}</Link>
        </li>
        <li>
          <Link to={"/login"}>{t("login")}</Link>
        </li>
        <li>
          <Link to="/forgot-password">{t("forgotPassword")}</Link>
        </li>
      </ul>
      <div className={classes.auth__aside__logout}>
        <p onClick={() => console.log("ciao")}>Logout</p>
      </div>
    </aside>
  );
};

export default Aside;
