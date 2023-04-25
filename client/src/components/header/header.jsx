import classes from "./header.module.scss";
import NavBar from "../nav/NavBar";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const isSticky = () => {
      if (window.scrollY >= 107) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  return (
    <header className={sticky ? classes.sticky : classes.header}>
      <div className={classes.header__container}>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
