import {
  faEuroSign,
  faShoppingBasket,
  faTag,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { dataSweetActions } from "../../../store/data-sweet-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../spinner/loadingSpinner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isAuth } from "../../../utils/isAuth";
import { useState, useEffect } from "react";
import classes from "./card.module.scss";
import axios from "axios";
import React from "react";

const SweetCard = ({
  sweetName,
  sweetQuantity,
  ingredients,
  price,
  discountedPrice,
  description,
  category,
  imageUrl,
  slug,
  _id,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uriLocation = window.location.href;

  const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  const token = useSelector((state) => state.userLogin.token);

  const [tokenExpiration, setTokenExpiration] = useState(() => {});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);

  const [errorQuantity, setErrorQuantity] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
    setTokenExpiration(isAuth(token));
  }, [isLoggedIn, token]);

  const incrementNewQuantity = () => setNewQuantity(newQuantity + 1);
  const decrementNewQuantity = () => setNewQuantity(newQuantity - 1);

  const sendSweetToFormHandler = () => {
    dispatch(
      dataSweetActions.setSweetData({
        sweetName,
        sweetQuantity,
        ingredients,
        price,
        description,
        category,
        imageUrl,
        _id,
      })
    );
    navigate("/admin/update-sweet");
  };

  const sendDetailSweet = () => {
    dispatch(
      dataSweetActions.setSweetData({
        sweetName,
        sweetQuantity,
        ingredients,
        price,
        discountedPrice,
        description,
        category,
        imageUrl,
        slug,
        _id,
      })
    );
    navigate(`/sweet/${slug}`);
  };

  const modifySweetQuantity = () => {
    setIsLoading(true);

    const dataQuantity = {
      newQuantity: parseInt(newQuantity),
      _id: _id,
    };

    axios
      .put(`${process.env.REACT_APP_API_LOCAL_PORT}/edit-sweet-quantity`, {
        dataQuantity,
      })
      .then((res) => {
        dispatch(
          dataSweetActions.updateSweetQuantity({
            _id: _id,
            sweetQuantity: parseInt(newQuantity),
          })
        );
        setIsLoading(false);
        setNewQuantity(0);
      })
      .catch((err) => {
        console.error(
          "there is an error for deleting the specific sweet: ",
          err.name
        );
        setIsLoading(false);
        setErrorQuantity(err);
      })
      .finally(() => {
        setErrorQuantity(null);
      });
  };

  const deleteSweetHandler = () => {
    setIsLoading(true);

    const sweetId = {
      _id: _id,
    };

    axios
      .delete(`${process.env.REACT_APP_API_LOCAL_PORT}/delete-sweet`, {
        data: sweetId,
      })
      .then((res) => {
        dispatch(dataSweetActions.removeSweetData({ _id: _id }));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(
          "there is an error for deleting the specific sweet: ",
          err.name
        );
        setIsLoading(false);
        setErrorDelete(err);
      })
      .finally(() => {
        setErrorDelete(null);
      });
  };

  return (
    <div
      className={
        uriLocation.includes("admin/sweets")
          ? classes.card + " " + classes.auth__card
          : classes.card
      }
    >
      {imageUrl && (
        <img
          onClick={sendDetailSweet}
          className={classes.card__image}
          src={imageUrl}
          alt={sweetName}
          title={sweetName}
          loading="lazy"
        />
      )}
      <div className={classes.card__internal__description}>
        {description && <p>{description}</p>}
        {_id && <input hidden id={_id} />}
      </div>
      {sweetName && <h2>{sweetName}</h2>}
      <div className={classes.card__external__informations}>
        <div>
          <div className={classes.card__external__informations__item}>
            {price && (
              <>
                <FontAwesomeIcon icon={faEuroSign} />
                <small
                  className={
                    discountedPrice < price && discountedPrice > 0
                      ? classes.discount__price
                      : ""
                  }
                >
                  {price}
                </small>
              </>
            )}
          </div>
          {discountedPrice < price && discountedPrice > 0 && (
            <div className={classes.card__external__informations__item}>
              {discountedPrice && (
                <>
                  <FontAwesomeIcon icon={faEuroSign} />
                  <small>{discountedPrice}</small>
                </>
              )}
            </div>
          )}
        </div>
        <div className={classes.card__external__informations__item}>
          {category && (
            <>
              <FontAwesomeIcon icon={faTag} />
              <small>{category}</small>
            </>
          )}
        </div>
        <div className={classes.card__external__informations__item}>
          {sweetQuantity && (
            <>
              <FontAwesomeIcon icon={faShoppingBasket} />
              <small>{sweetQuantity}</small>
            </>
          )}
        </div>
      </div>
      {isAuthenticated && tokenExpiration && (
        <>
          <div className={classes.card__button__wrapper}>
            <button
              onClick={sendSweetToFormHandler}
              className={classes.card__cta}
            >
              {t("modifySweetCard")}
            </button>
            <button onClick={deleteSweetHandler} className={classes.card__cta}>
              {t("deleteSweetCard")}
            </button>
          </div>
          <div className={classes.card__button__quantity__wrapper}>
            <div>
              <button onClick={decrementNewQuantity}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
              />
              <button onClick={incrementNewQuantity}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <button onClick={modifySweetQuantity} className={classes.card__cta}>
              {t("modifyQuantity")}
            </button>
          </div>
        </>
      )}
      {isLoading && <LoadingSpinner />}
      {errorDelete && (
        <small className={classes.error}>{t("errors.errorSweetDelete")}</small>
      )}
      {errorQuantity && (
        <small className={classes.error}>
          {t("errors.errorSweetQuantity")}
        </small>
      )}
    </div>
  );
};

export default SweetCard;
