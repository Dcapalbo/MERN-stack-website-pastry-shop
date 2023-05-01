import { useTranslation } from "react-i18next";
import classes from "./card.module.scss";
import React from "react";

const AboutCard = (props) => {
  const { t } = useTranslation();

  return (
    <div className={classes.card}>
      {props.imageUrl && (
        <img
          className={classes.card__image}
          src={""}
          alt={"Laura"}
          loading="lazy"
        />
      )}
      <div className={classes.card__internal__description}>
        {props.description && <p>{props.description}</p>}
      </div>
      {props.sweetName && <h2>{props.sweetName}</h2>}
      <div className={classes.card__external__informations}>
        <div className={classes.card__external__informations__item}>
          <p>le mie informazioni su Laura</p>
        </div>
        <div className={classes.card__external__informations__item}>
          <p>Altre mie informazioni su Laura</p>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
