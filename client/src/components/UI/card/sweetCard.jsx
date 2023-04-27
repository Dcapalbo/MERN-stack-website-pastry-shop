import { faEuroSign, faTag } from "@fortawesome/free-solid-svg-icons";
import { dataSweetActions } from "../../../store/data-sweet-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import classes from "../../../assets/card.module.scss";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isAuth } from "../../../utils/isAuth";
import { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
    setTokenExpiration(isAuth(token));
  }, [isLoggedIn, dispatch, token]);

  const sendSweetToFormHandler = () => {
    dispatch(
      dataSweetActions.setSweetData({
        sweetName: props.sweetName,
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
        // ingredientName: props.ingredientName,
        // measureUnit: props.measureUnit,
        // amount: props.amount.toString(),
        price: props.price.toString(),
        description: props.description,
        category: props.category,
        imageUrl: props.imageUrl,
        slug: props.slug,
        _id: props._id,
      })
    );
    navigate(`/sweet/${props.slug}`);
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
        <div className={classes.card__external__informations__item}>
          {props.price && (
            <>
              <FontAwesomeIcon icon={faEuroSign} />
              <small>{props.price}</small>
            </>
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
      </div>
      {isAuthenticated && tokenExpiration && (
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
