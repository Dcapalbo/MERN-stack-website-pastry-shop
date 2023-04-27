import PuffLoader from "react-spinners/PuffLoader";
import classes from "./detailSweet.module.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";

const Sweetsweet = () => {
  const { t } = useTranslation();

  const sweet = useSelector((state) => state.dataSweets.sweetData);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (sweet) {
      setIsLoading(false);
    } else {
      setError(true);
    }
  }, [sweet]);

  if (loading) {
    return (
      <PuffLoader
        style={{
          display: "inherit",
          position: "relative",
          width: "100px",
          height: "100px",
          margin: "auto",
        }}
        color={"#d27b7b"}
        size={100}
      />
    );
  } else if (error) {
    return (
      <h1 className={classes.text__align__center}>
        Il dolce selezionato non è stato trovato, tornare alla pagina precedente
      </h1>
    );
  } else {
    return (
      sweet && (
        <section className={classes.detail__sweet__about__container}>
          <img
            className={classes.detail__sweet__about__card__image}
            src={sweet.imageUrl ?? ""}
            alt={sweet.sweetName ?? ""}
            sweetName={sweet.sweetName ?? ""}
            loading="lazy"
          />
          <div className={classes.detail__sweet__about__card__info}>
            {sweet.sweetName && (
              <div
                className={classes.detail__sweet__about__card__info__wrapper}
              >
                <div>
                  <h2>{t("sweetName")}:</h2>
                </div>
                <div>
                  <h2>{sweet.sweetName ?? ""}</h2>
                </div>
              </div>
            )}
            {sweet?.ingredientName && (
              <div
                className={classes.detail__sweet__about__card__info__wrapper}
              >
                <div>
                  <h2>{t("ingredientName")}:</h2>
                </div>
                <div>
                  <h2>{sweet?.ingredientName ?? ""}</h2>
                </div>
              </div>
            )}
            {sweet?.measureUnit && (
              <div
                className={classes.detail__sweet__about__card__info__wrapper}
              >
                <div>
                  <h2>{t("measureUnit")}:</h2>
                </div>
                <div>
                  <h2>{sweet?.measureUnit ?? ""}</h2>
                </div>
              </div>
            )}
            {sweet?.amount && (
              <div
                className={classes.detail__sweet__about__card__info__wrapper}
              >
                <div>
                  <p>{t("amount")}:</p>
                </div>
                <div>
                  <p>{sweet?.amount ?? ""}</p>
                </div>
              </div>
            )}
            {sweet.price && (
              <div
                className={classes.detail__sweet__about__card__info__wrapper}
              >
                <div>
                  <p>{t("price")}:</p>
                </div>
                <div>
                  <p>{sweet.price ?? ""}</p>
                </div>
              </div>
            )}
            {sweet.description && (
              <div
                className={classes.detail__sweet__about__card__info__wrapper}
              >
                <div>
                  <p>{t("description")}:</p>
                </div>
                <div>
                  <p>{sweet.description ?? ""}</p>
                </div>
              </div>
            )}
            {sweet.category && (
              <div
                className={classes.detail__sweet__about__card__info__wrapper}
              >
                <div>
                  <p>{t("category")}:</p>
                </div>
                <div>
                  <p>{sweet.category ?? ""}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )
    );
  }
};

export default Sweetsweet;
