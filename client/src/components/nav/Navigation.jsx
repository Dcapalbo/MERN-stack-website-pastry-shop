import logo from "../../assets/img/logo_transparent.jpeg";
import classes from "./navigation.module.scss";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import React from "react";

const Navigation = () => {
  return (
    <nav className={classes.navigation}>
      <Link to="/">
        <img
          className={classes.brand__logo}
          src={logo}
          alt="logo pastry"
          title="logo pastry"
        />
      </Link>
      <NavLinks />
    </nav>
  );
};

export default Navigation;
