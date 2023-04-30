import { faEuroSign, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./detailSweet.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
import LoadingSpinner from "../spinner/loadingSpinner";

const Sweetsweet = () => {
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
    return <LoadingSpinner />;
  } else if (error) {
    return (
      <h1 className={classes.text__align__center}>
        Il dolce selezionato non è stato trovato, tornare alla pagina precedente
      </h1>
    );
  } else {
    return (
      sweet && (
        <section className={classes.detail__sweet__container}>
          <div className={classes.detail__sweet__card__container}>
            <img
              className={classes.detail__sweet__card__image}
              src={sweet.imageUrl ?? ""}
              alt={sweet.sweetName ?? ""}
              sweetname={sweet.sweetName ?? ""}
              loading="lazy"
            />
            <div className={classes.detail__sweet__card__info__flex}>
              <div className={classes.detail__sweet__card}>
                {sweet.sweetName && (
                  <div className={classes.detail__sweet__card__info__wrapper}>
                    <h2>{sweet.sweetName ?? ""}</h2>
                  </div>
                )}
                {sweet?.ingredientName && (
                  <div className={classes.detail__sweet__card__info__wrapper}>
                    <h2>{sweet?.ingredientName ?? ""}</h2>
                  </div>
                )}
                {sweet?.measureUnit && (
                  <div className={classes.detail__sweet__card__info__wrapper}>
                    <h2>{sweet?.measureUnit ?? ""}</h2>
                  </div>
                )}
                {sweet?.amount && (
                  <div className={classes.detail__sweet__card__info__wrapper}>
                    <p>{sweet?.amount ?? ""}</p>
                  </div>
                )}
                {sweet.description && (
                  <div className={classes.detail__sweet__card__info__wrapper}>
                    <p>{sweet.description ?? ""}</p>
                  </div>
                )}
                {sweet.price && (
                  <>
                    <div className={classes.detail__sweet__card__info__wrapper}>
                      <div
                        className={
                          classes.detail__sweet__card__info__wrapper__item
                        }
                      >
                        <>
                          <FontAwesomeIcon icon={faEuroSign} />
                          <small>{sweet.price}</small>
                        </>
                      </div>
                      <div
                        className={
                          classes.detail__sweet__card__info__wrapper__item
                        }
                      >
                        <>
                          <FontAwesomeIcon icon={faEuroSign} />
                          <small>{sweet.price}</small>
                        </>
                      </div>
                    </div>
                  </>
                )}
                {sweet.category && (
                  <div className={classes.detail__sweet__card__info__wrapper}>
                    <div
                      className={
                        classes.detail__sweet__card__info__wrapper__item
                      }
                    >
                      <>
                        <FontAwesomeIcon icon={faTag} />
                        <small>{sweet.category}</small>
                      </>
                    </div>
                  </div>
                )}
              </div>
              <div className={classes.detail__sweet__card}>
                <div
                  className={
                    classes.detail__sweet__card__ingredients__container
                  }
                >
                  <div>
                    <p>Ingrediente numero 1</p>
                  </div>
                  <div
                    className={classes.detail__sweet__card__ingredients__item}
                  >
                    <small>100</small>
                    <small>gr</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    );
  }
};

export default Sweetsweet;
