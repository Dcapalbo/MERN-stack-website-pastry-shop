import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./mobileNavigation.module.scss";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useState } from "react";
import React from "react";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const hamburgher = (
    <FontAwesomeIcon
      className={classes.hamburgher}
      icon={faBars}
      onClick={openMobileMenu}
    />
  );

  const closeButton = (
    <FontAwesomeIcon
      className={classes.cross__button}
      icon={faTimes}
      onClick={openMobileMenu}
    />
  );

  return (
    <nav
      className={
        isOpen
          ? classes.clicked__mobile__navigation
          : classes.mobile__navigation
      }
    >
      {!isOpen && (
        <Link to="/home">
          <img
            className={classes.brand__logo}
            src={""}
            alt="logo pastry"
            title="logo pastry"
          />
        </Link>
      )}
      {isOpen ? closeButton : hamburgher}
      {isOpen && <NavLinks />}
    </nav>
  );
};

export default MobileNavigation;
