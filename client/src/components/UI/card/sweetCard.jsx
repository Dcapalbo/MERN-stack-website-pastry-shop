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
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isAuth } from "../../../utils/isAuth";
import { useState, useEffect } from "react";
import classes from "./card.module.scss";
import axios from "axios";
import React from "react";

const SweetCard = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uriLocation = window.location.href;

  const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  const token = useSelector((state) => state.userLogin.token);

  const [tokenExpiration, setTokenExpiration] = useState(() => {});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
    setTokenExpiration(isAuth(token));
  }, [isLoggedIn, token]);

  const incrementNewQuantity = () => setNewQuantity(newQuantity + 1);
  const decrementNewQuantity = () => setNewQuantity(newQuantity - 1);

  const sendSweetToFormHandler = () => {
    dispatch(
      dataSweetActions.setSweetData({
        sweetName: props.sweetName,
        sweetQuantity: props.sweetQuantity.toString(),
        // ingredientName: props.ingredientName,
        // measureUnit: props.measureUnit,
        // amount: props.amount.toString(),
        price: props.price.toString(),
        description: props.description,
        category: props.category,
        imageUrl: props.imageUrl,
        _id: props._id,
      })
    );
    navigate("/admin/update-sweet");
  };

  const sendDetailSweet = () => {
    dispatch(
      dataSweetActions.setSweetData({
        sweetName: props.sweetName,
        sweetQuantity: props.sweetQuantity,
        price: props.price,
        discountedPrice: props.discountedPrice,
        // ingredientName: props.ingredientName,
        // measureUnit: props.measureUnit,
        // amount: props.amount,
        description: props.description,
        category: props.category,
        imageUrl: props.imageUrl,
        slug: props.slug,
        _id: props._id,
      })
    );
    navigate(`/sweet/${props.slug}`);
  };

  const modifySweetQuantity = () => {
    setIsLoading(true);

    const dataQuantity = {
      newQuantity: parseInt(newQuantity),
      _id: props._id,
    };

    axios
      .put(`${process.env.REACT_APP_API_LOCAL_PORT}/edit-sweet-quantity`, {
        dataQuantity,
      })
      .then((res) => {
        dispatch(
          dataSweetActions.updateSweetQuantity({
            _id: props._id,
            sweetQuantity: parseInt(newQuantity),
          })
        );
        setIsLoading(false);
        setNewQuantity("");
      })
      .catch((err) => {
        console.error(
          "there is an error for deleting the specific sweet: ",
          err.name
        );
        setIsLoading(false);
        setError(err);
      });
  };

  const deleteSweetHandler = () => {
    setIsLoading(true);

    const sweetId = {
      _id: props._id,
    };

    axios
      .delete(`${process.env.REACT_APP_API_LOCAL_PORT}/delete-sweet`, {
        data: sweetId,
      })
      .then((res) => {
        dispatch(dataSweetActions.removeSweetData({ _id: props._id }));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(
          "there is an error for deleting the specific sweet: ",
          err.name
        );
        setIsLoading(false);
        setError(err);
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
      {props.imageUrl && (
        <img
          onClick={sendDetailSweet}
          className={classes.card__image}
          src={props.imageUrl}
          alt={props.sweetName}
          sweetName={props.sweetName}
          loading="lazy"
        />
      )}
      <div className={classes.card__internal__description}>
        {props.description && <p>{props.description}</p>}
        {props.ingredientName && <p>{props.ingredientName}</p>}
        {props.measureUnit && <p>{props.measureUnit}</p>}
        {props.amount && <p>{props.amount}</p>}
        {props.slug && <input hidden id={props.slug} />}
        {props._id && <input hidden id={props._id} />}
      </div>
      {props.sweetName && <h2>{props.sweetName}</h2>}
      <div className={classes.card__external__informations}>
        <div>
          <div className={classes.card__external__informations__item}>
            {props.price && (
              <>
                <FontAwesomeIcon icon={faEuroSign} />
                <small
                  className={
                    props.discountedPrice !== props.price
                      ? classes.discount__price
                      : ""
                  }
                >
                  {props.price}
                </small>
              </>
            )}
          </div>
          {props.discountedPrice !== props.price && (
            <div className={classes.card__external__informations__item}>
              {props.discountedPrice && (
                <>
                  <FontAwesomeIcon icon={faEuroSign} />
                  <small>{props.discountedPrice.toFixed(2)}</small>
                </>
              )}
            </div>
          )}
        </div>
        <div className={classes.card__external__informations__item}>
          {props.category && (
            <>
              <FontAwesomeIcon icon={faTag} />
              <small>{props.category}</small>
            </>
          )}
        </div>
        <div className={classes.card__external__informations__item}>
          {props.sweetQuantity && (
            <>
              <FontAwesomeIcon icon={faShoppingBasket} />
              <small>{props.sweetQuantity}</small>
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
              Modifica quantità
            </button>
          </div>
        </>
      )}
      {isLoading && (
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
      )}
      {error && <small>{t("errors.errorSweetDelete")}</small>}
    </div>
  );
};

export default SweetCard;
