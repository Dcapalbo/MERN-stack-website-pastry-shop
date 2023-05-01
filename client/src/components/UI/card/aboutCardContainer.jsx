import classes from "./aboutCardContainer.module.scss";
import AboutCard from "./aboutCard";
import React from "react";

function AboutCardContainer() {
  return (
    <section className={classes.wrapper__about__container}>
      <AboutCard />
    </section>
  );
}

export default AboutCardContainer;
