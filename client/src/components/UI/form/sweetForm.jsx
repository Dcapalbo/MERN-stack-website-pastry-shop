import { dataSweetActions } from "../../../store/data-sweet-slice";
import { useForm, useController } from "react-hook-form";
import { sweetSchema } from "../../../schema/sweetSchema";
import { slugCreation } from "../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "../spinner/loadingSpinner";
import ErrorMessage from "../errorMessage/errorMessage";
import classes from "./genericForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TypeSelect from "../select/typeSelect";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const SweetForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uriLocation = window.location.href;

  const dataUpdateSweets = useSelector(
    (state) => state.dataSweets.sweetData ?? ""
  );

  console.log(dataUpdateSweets);

  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: dataUpdateSweets ?? "",
    resolver: zodResolver(sweetSchema),
  });

  useEffect(() => {
    if (uriLocation.includes("/admin/update-sweet")) {
      setIsUpdate(true);
    } else {
      dispatch(dataSweetActions.resetSweetData());
      setIsUpdate(false);
    }
  }, [uriLocation, dispatch]);

  const { errors } = formState;

  const { field } = useController({ name: "category", control });

  const [ingredientsObject, setIngredientsObject] = useState([
    { ingredientName: "", measureUnit: "", amount: 0 },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectChange = (option) => {
    field.onChange(option.target.value);
  };

  const handleAddIngredient = () => {
    setIngredientsObject([
      ...ingredientsObject,
      { ingredientName: "", measureUnit: "", amount: 0 },
    ]);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredientsObject];
    updatedIngredients.splice(index, 1);
    setIngredientsObject(updatedIngredients);
  };

  const confirmHandler = (event) => {
    const formData = new FormData();

    const {
      sweetName,
      sweetQuantity,
      price,
      description,
      category,
      ingredients,
    } = event;

    formData.append("sweetName", sweetName);
    formData.append("sweetQuantity", sweetQuantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    ingredients.forEach((ingredient, index) => {
      formData.append(
        `ingredients[${index}][ingredientName]`,
        ingredient.ingredientName
      );
      formData.append(
        `ingredients[${index}][measureUnit]`,
        ingredient.measureUnit
      );
      formData.append(`ingredients[${index}][amount]`, ingredient.amount);
    });
    formData.append("slug", slugCreation(sweetName));
    formData.append("file", file);

    if (dataUpdateSweets?._id) {
      formData.append("_id", dataUpdateSweets?._id);
    }

    if (formData !== {}) {
      if (uriLocation.includes("/admin/add-new-sweet")) {
        setIsLoading(true);
        axios
          .post(`${process.env.REACT_APP_API_LOCAL_PORT}/add-sweet`, formData)
          .then((res) => {
            console.log(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
            // navigate("/admin/sweets");
          });
      } else {
        setIsLoading(true);
        axios
          .put(`${process.env.REACT_APP_API_LOCAL_PORT}/update-sweet`, formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error("there is an error for updating a sweet: ", err);
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
            navigate("/admin/sweets");
          });
      }
    }
  };

  return (
    <section
      className={classes.form__wrapper + " " + classes.resetting__padding}
    >
      <form
        onSubmit={handleSubmit(confirmHandler)}
        className={classes.form__container}
      >
        <div className={classes.form__container__item}>
          {!isUpdate ? (
            <h4>{t("labels.addDbSweet")}</h4>
          ) : (
            isUpdate && <h4>{t("labels.modifyDbSweet")}</h4>
          )}
          <label htmlFor="SweetName">{t("sweetName")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.sweetName ?? ""}
            {...register("sweetName")}
            type="text"
          />
          {errors.sweetName?.message && (
            <ErrorMessage error={errors.sweetName?.message} />
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="SweetQuantity">{t("sweetQuantity")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.sweetQuantity ?? ""}
            {...register("sweetQuantity", { valueAsNumber: true })}
            type="number"
          />
          {errors.sweetQuantity?.message && (
            <ErrorMessage error={errors.sweetQuantity?.message} />
          )}
        </div>
        {ingredientsObject.map((ingredient, index) => (
          <div
            className={
              classes.form__container__item + " " + classes.ingredients
            }
            key={index}
          >
            <label htmlFor="IngredientName">{t("ingredientName")}</label>
            <input
              defaultValue={
                formState.defaultValues?.payload?.ingredient?.[index]
                  ?.ingredientName ?? ""
              }
              {...register(`ingredients.${index}.ingredientName`)}
              type="text"
            />
            {errors.ingredients?.[index]?.ingredientName?.message && (
              <ErrorMessage
                error={errors.ingredients?.[index]?.ingredientName}
                index={index}
              />
            )}
            <label className={classes.margin__top} htmlFor="MeasureUnit">
              {t("measureUnit")}
            </label>
            <input
              defaultValue={
                formState.defaultValues?.payload?.ingredients?.[index]
                  ?.measureUnit ?? ""
              }
              {...register(`ingredients.${index}.measureUnit`)}
              type="text"
            />
            {errors.ingredients?.[index]?.measureUnit?.message && (
              <ErrorMessage
                error={errors.ingredients?.[index]?.measureUnit}
                index={index}
              />
            )}
            <label className={classes.margin__top} htmlFor="Amount">
              {t("amount")}
            </label>
            <input
              defaultValue={
                formState.defaultValues?.payload?.ingredients?.[index]
                  ?.amount ?? ""
              }
              {...register(`ingredients.${index}.amount`, {
                valueAsNumber: true,
              })}
              type="number"
            />
            {errors.ingredients?.[index]?.amount?.message && (
              <ErrorMessage
                error={errors.ingredients?.[index]?.amount}
                index={index}
              />
            )}
            {index !== 0 && (
              <button
                onClick={() => handleDeleteIngredient(index)}
                className={classes.primary__button}
                type="button"
              >
                {t("labels.deleteIngredient")}
              </button>
            )}
          </div>
        ))}
        <div className={classes.form__container__item}>
          <button
            onClick={() => handleAddIngredient()}
            className={classes.primary__button}
            type="button"
          >
            {t("labels.addIngredient")}
          </button>
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Price">{t("price")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.price ?? ""}
            {...register("price", {
              valueAsNumber: true,
            })}
            type="number"
          />
          {errors.price?.message && <ErrorMessage error={errors.price} />}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Description">{t("description")}</label>
          <textarea
            defaultValue={formState.defaultValues?.payload?.description ?? ""}
            {...register("description")}
            type="text"
          ></textarea>
          {errors.description?.message && (
            <ErrorMessage error={errors.description} />
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Category">{t("category")}</label>
          <TypeSelect onChange={handleSelectChange} value={field.value} />
          {errors.category?.message && <ErrorMessage error={errors.category} />}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Image">{t("cover")}</label>
          <input
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
            }}
            type="file"
            name="Image"
            required
          />
        </div>
        <div className={classes.form__container__item}>
          {!isUpdate ? (
            <>
              <button className={classes.primary__button} type="submit">
                {t("insertAction")}
              </button>
              <div className={classes.generic__margin__top}>
                {error && <small>{t("errors.dbCrud")}</small>}
              </div>
            </>
          ) : (
            isUpdate && (
              <>
                <button className={classes.primary__button} type="submit">
                  {t("modifyAction")}
                </button>
                <div className={classes.generic__margin__top}>
                  {error && <small>{t("errors.dbCrud")}</small>}
                </div>
              </>
            )
          )}
        </div>
        {isLoading && <LoadingSpinner />}
      </form>
    </section>
  );
};

export default SweetForm;
