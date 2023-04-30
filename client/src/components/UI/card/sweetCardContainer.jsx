import StateGetHook from "../../../hooks/stateGetHook";
import base64ArrayBuffer from "../../../utils/base64";
import classes from "./cardContainer.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SweetCard from "./sweetCard";
import LoadingSpinner from "../spinner/loadingSpinner";

const SweetCardContainer = () => {
  const { t } = useTranslation();
  let uriLocation = window.location.href;

  const sweetCategory = useSelector((state) => state.dataType.category) || "";
  const [filteredSweets, setFilteredSweets] = useState([]);

  const { sweets, loading, error } = StateGetHook(
    (state) => state.dataSweets.sweetsData
  );

  console.log(sweets);

  useEffect(() => {
    if (sweets) {
      setFilteredSweets(sweets);
      if (sweetCategory) {
        const filteredSweets = sweets.filter(
          (sweet) =>
            sweet.category.toLowerCase() === sweetCategory.toLowerCase()
        );
        setFilteredSweets(filteredSweets);
      }
    }
  }, [sweets, sweetCategory]);

  if (loading) {
    return <LoadingSpinner />;
  } else if (error) {
    return (
      <h1 className={classes.text__align__center}>
        There are some problems, please try to refresh
      </h1>
    );
  } else {
    return (
      <section
        className={
          uriLocation.includes("/admin/sweets")
            ? classes.admin__wrapper__card__container
            : classes.wrapper__card__container
        }
      >
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
                sweetQuantity={sweet.sweetQuantity}
                ingredients={sweet.ingredients}
                price={sweet.price}
                discountedPrice={sweet.discountedPrice}
                description={sweet.description}
                category={sweet.category}
                slug={sweet.slug}
                imageUrl={`data:image/png;base64,${base64ArrayBuffer(sweet)}`}
                key={sweet._id}
                _id={sweet._id}
              />
            ))
          ) : (
            <h1>{t("errors.emptySweets")}</h1>
          )}
        </div>
      </section>
    );
  }
};

export default SweetCardContainer;
