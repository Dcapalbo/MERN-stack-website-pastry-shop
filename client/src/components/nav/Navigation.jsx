import { Link } from "react-router-dom";
import classes from "./navigation.module.scss";
import NavLinks from "./NavLinks";
import React from "react";

const Navigation = () => {
  return (
    <nav className={classes.navigation}>
      <Link to="/home">
        <img
          className={classes.brand__logo}
          src={""}
          alt="logo pastry"
          title="logo pastry"
        />
      </Link>
      <NavLinks />
    </nav>
  );
};

export default Navigation;
