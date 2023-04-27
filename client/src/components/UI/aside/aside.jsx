import { dataSweetActions } from "../../../store/data-sweet-slice";
import { dataUserActions } from "../../../store/data-user-slice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ApiGetHook from "../../../hooks/apiGetHook";
import { useTranslation } from "react-i18next";
import classes from "./aside.module.scss";
import React from "react";

const Aside = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let uriLocation = window.location.href;

  if (uriLocation.includes("/admin/sweets")) {
    const { sweets } = ApiGetHook(
      `${process.env.REACT_APP_API_LOCAL_PORT}/get-sweets`
    );

    dispatch(dataSweetActions.setSweetsData(sweets));
  }

  const userName = useSelector((state) => state.userLogin.userName);

  const logout = () => {
    dispatch(dataUserActions.logout());
    navigate("/login");
  };

  return (
    <aside className={classes.auth__aside}>
      <ul className={classes.auth__aside__nav}>
        <li className={classes.auth__aside__personal__area__color}>
          <p>Area Personale</p>
        </li>
        <li className={classes.auth__aside__personal__area__color}>
          <p>Utente loggato:</p>
          <p>{userName}</p>
        </li>
        <li
          className={
            classes.auth__aside__nav__margin +
            " " +
            classes.auth__aside__generic__color
          }
        >
          <Link to={"/home"}>{t("home")}</Link>
        </li>
        <li className={classes.auth__aside__generic__color}>
          <Link to={"/about"}>{t("about")}</Link>
        </li>
        <li className={classes.auth__aside__generic__color}>
          <Link to={"/admin/sweets"}>{t("sweetsList")}</Link>
        </li>
        <li className={classes.auth__aside__generic__color}>
          <Link to={"/admin/add-new-sweet"}>{t("addSweet")}</Link>
        </li>
        <li className={classes.auth__aside__generic__color}>
          <Link to={"/sign-up"}>{t("signUp")}</Link>
        </li>
        <li className={classes.auth__aside__generic__color}>
          <Link to={"/login"}>{t("login")}</Link>
        </li>
        <li className={classes.auth__aside__generic__color}>
          <Link to="/forgot-password">{t("forgotPassword")}</Link>
        </li>
      </ul>
      <div className={classes.auth__aside__logout}>
        <p onClick={logout}>Logout</p>
      </div>
    </aside>
  );
};

export default Aside;
