// import logo from "../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png";
import MobileNavigation from "./MobileNavigation";
import { useTranslation } from "react-i18next";
import classes from "./navBar.module.scss";
import { useState, useEffect } from "react";
import { isAuth } from "../../utils/isAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const NavBar = () => {
  const { t } = useTranslation();

  // const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  // const userEmail = useSelector((state) => state.userLogin.userEmail);
  // const token = useSelector((state) => state.userLogin.token);

  // useEffect(() => {
  //   setIsAuthenticated(isLoggedIn);
  //   setTokenExpiration(isAuth(token));
  // }, [isLoggedIn, token]);

  return (
    <>
      <div className={classes.flex__wrapper}>
        <Navigation />
        <MobileNavigation />
      </div>
    </>
  );
};

export default NavBar;
