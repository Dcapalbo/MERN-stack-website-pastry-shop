import LuanaImage from "../../../assets/img/pexels-andrea-piacquadio-3770002.jpeg";
import MariaImage from "../../../assets/img/pexels-shvets-production-7525118.jpeg";
import { useTranslation } from "react-i18next";
import classes from "./aboutCard.module.scss";
import React from "react";

const AboutCard = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.card__about}>
        <img
          className={classes.card__about__image}
          src={LuanaImage}
          alt={"Luana"}
          loading="lazy"
          title="Luana"
        />
        <div className={classes.card__about__headline}>
          <h2>{t("headlineLuana")}</h2>
        </div>
        <div className={classes.card__about__description}>
          <p>{t("descriptionLuana")}</p>
        </div>
      </div>
      <div className={classes.card__about}>
        <img
          className={classes.card__about__image}
          src={MariaImage}
          alt={"Maria"}
          loading="lazy"
          title="Maria"
        />
        <div className={classes.card__about__headline}>
          <h2>{t("headlineMaria")}</h2>
        </div>
        <div className={classes.card__about__description}>
          <p>{t("descriptionMaria")}</p>
        </div>
      </div>
    </>
  );
};

export default AboutCard;
