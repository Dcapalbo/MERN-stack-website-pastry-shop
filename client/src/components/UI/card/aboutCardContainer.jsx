import classes from "./cardContainer.module.scss";
import AboutCard from "./aboutCard";
import React from "react";

function AboutCardContainer() {
  return (
    <section className={classes.wrapper__card__container}>
      <AboutCard />
    </section>
  );
}

export default AboutCardContainer;
