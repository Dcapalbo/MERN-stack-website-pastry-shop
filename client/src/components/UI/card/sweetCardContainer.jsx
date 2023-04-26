import { dataSweetActions } from "../../../store/data-sweet-slice";
import { useDispatch, useSelector } from "react-redux";
import { slugCreation } from "../../../utils/functions";
import StateGetHook from "../../../hooks/stateGetHook";
import base64ArrayBuffer from "../../../utils/base64";
import PuffLoader from "react-spinners/PuffLoader";
import ApiGetHook from "../../../hooks/apiGetHook";
import classes from "./cardContainer.module.scss";
import { useEffect, useState } from "react";
import SweetCard from "./sweetCard";

const SweetCardContainer = () => {
  const dispatch = useDispatch();
  let uriLocation = window.location.href;

  const sweetCategory =
    useSelector((state) => state.sweetCategory.category) || "";
  const [filteredSweets, setFilteredSweets] = useState([]);

  let sweets;
  let loading;
  let error;

  if (
    uriLocation === `${process.env.REACT_APP_CLIENT_LOCAL_PORT}/admin/sweets`
  ) {
    const apiData = ApiGetHook(
      `${process.env.REACT_APP_API_LOCAL_PORT}/get-sweets`
    );

    sweets = apiData.sweets;
    loading = apiData.loading;
    error = apiData.error;

    dispatch(dataSweetActions.setSweetsData(sweets));
  } else {
    const stateData = StateGetHook((state) => state.dataSweet.sweetsData);

    sweets = stateData.sweets;
    loading = stateData.loading;
    error = stateData.error;
  }

  useEffect(() => {
    if (sweets) {
      setFilteredSweets(sweets);
      if (sweetCategory) {
        const filteredSweets = sweets.filter(
          (sweet) => sweet.category === sweetCategory
        );
        setFilteredSweets(filteredSweets);
      }
    }
  }, [sweetCategory, sweets]);

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
        There are some problems, please try to refresh
      </h1>
    );
  } else {
    return (
      <section className={classes.wrapper__card__container}>
        <div
          className={
            (filteredSweets.length > 2
              ? classes.card__container
              : classes.card__container,
            classes.justify__content__center)
          }
        >
          {filteredSweets.length > 0 ? (
            filteredSweets.map((sweet) => (
              <SweetCard
                sweetName={sweet.sweetName}
                ingredientName={sweet.ingredientName}
                measureUnit={sweet.measureUnit}
                amount={sweet.amount}
                price={sweet.price}
                description={sweet.description}
                slug={sweet.slugCreation(sweet.sweetName)}
                category={sweet.category}
                imageUrl={`data:image/png;base64,${base64ArrayBuffer(sweet)}`}
                key={sweet._id}
                _id={sweet._id}
              />
            ))
          ) : (
            <h1>
              Non ci sono elementi per questa ricerca, inserirli manualmente
              presso la sezione del Database dedicata ai dolci
            </h1>
          )}
        </div>
      </section>
    );
  }
};

export default SweetCardContainer;
