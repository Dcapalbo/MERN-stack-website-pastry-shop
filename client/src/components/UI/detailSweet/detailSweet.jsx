import PuffLoader from "react-spinners/PuffLoader";
import classes from "./dataFilmAbout.module.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";

const SweetFilm = () => {
  const { t } = useTranslation();
  const film = useSelector((state) => state.dataFilm.filmData);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (film) {
      setIsLoading(false);
    } else {
      setError(true);
    }
  }, [film]);

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
        color={"#cc0000"}
        size={100}
      />
    );
  } else if (error) {
    return (
      <h1 className={classes.text__align__center}>
        Il film selezionato non è stato trovato, tornare alla pagina precedente
      </h1>
    );
  } else {
    return (
      film && (
        <section className={classes.detail__film__about__container}>
          <img
            className={classes.detail__film__about__card__image}
            src={film?.imageUrl ?? ""}
            alt={film?.title ?? ""}
            title={film?.title ?? ""}
            loading="lazy"
          />
          <div className={classes.detail__film__about__card__info}>
            {film?.title && (
              <div className={classes.detail__film__about__card__info__wrapper}>
                <div>
                  <h2>{t("title")}:</h2>
                </div>
                <div>
                  <h2>{film?.title ?? ""}</h2>
                </div>
              </div>
            )}
            {film?.director && (
              <div className={classes.detail__film__about__card__info__wrapper}>
                <div>
                  <h2>{t("director")}:</h2>
                </div>
                <div>
                  <h2>{film?.director ?? ""}</h2>
                </div>
              </div>
            )}
            {film?.production && (
              <div className={classes.detail__film__about__card__info__wrapper}>
                <div>
                  <h2>{t("production")}:</h2>
                </div>
                <div>
                  <h2>{film?.production ?? ""}</h2>
                </div>
              </div>
            )}
            {film?.screenwriter && (
              <div className={classes.detail__film__about__card__info__wrapper}>
                <div>
                  <p>{t("screenwriter")}:</p>
                </div>
                <div>
                  <p>{film?.screenwriter ?? ""}</p>
                </div>
              </div>
            )}
            {film?.directorOfPhotography && (
              <div className={classes.detail__film__about__card__info__wrapper}>
                <div>
                  <p>{t("directorOfPhotography")}:</p>
                </div>
                <div>
                  <p>{film?.directorOfPhotography ?? ""}</p>
                </div>
              </div>
            )}
            {film?.synopsis && (
              <div className={classes.detail__film__about__card__info__wrapper}>
                <div>
                  <p>{t("synopsis")}:</p>
                </div>
                <div>
                  <p>{film?.synopsis ?? ""}</p>
                </div>
              </div>
            )}
            {film?.duration && (
              <div className={classes.detail__film__about__card__info__wrapper}>
                <div>
                  <p>{t("duration")}:</p>
                </div>
                <div>
                  <p>{film?.duration ?? ""}</p>
                </div>
              </div>
            )}
            {film?.year && (
              <div className={classes.detail__film__about__card__info__wrapper}>
                <div>
                  <p>{t("year")}:</p>
                </div>
                <div>
                  <p>{film?.year ?? ""}</p>
                </div>
              </div>
            )}
            {film?.type && (
              <div className={classes.detail__film__about__card__info__wrapper}>
                <div>
                  <p>{t("typology")}:</p>
                </div>
                <div>
                  <p>{film?.type ?? ""}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )
    );
  }
};

export default SweetFilm;
