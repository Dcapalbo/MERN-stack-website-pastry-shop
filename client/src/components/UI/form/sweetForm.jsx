import { dataSweetActions } from "../../../store/data-sweet-slice";
import { useForm, useController } from "react-hook-form";
import { sweetSchema } from "../../../schema/sweetSchema";
import { slugCreation } from "../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TypeSelect from "../select/typeSelect";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const FilmForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uriLocation = window.location.href;

  const dataUpdateSweets = useSelector(
    (state) => state.dataSweets.sweetData ?? ""
  );

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

  const [enteredFileIsValid, setEnteredFileisValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fileVaue, setFileValue] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectChange = (option) => {
    field.onChange(option.target.value);
  };

  const confirmHandler = (event) => {
    let validFile = fileVaue !== null && fileVaue !== "";
    setEnteredFileisValid(validFile);

    const formData = new FormData();

    const {
      sweetName,
      sweetQuantity,
      ingredientName,
      measureUnit,
      amount,
      price,
      description,
      category,
    } = event;

    formData.append("sweetName", sweetName);
    formData.append("sweetQuantity", sweetQuantity);
    formData.append("ingredientName", ingredientName);
    formData.append("measureUnit", measureUnit);
    formData.append("amount", amount);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("slug", slugCreation(sweetName));
    formData.append("file", fileVaue);

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
            navigate("/admin/sweets");
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
            <small>{errors.sweetName?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="SweetQuantity">{t("sweetQuantity")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.sweetQuantity ?? ""}
            {...register("sweetQuantity")}
            type="number"
          />
          {errors.sweetQuantity?.message && (
            <small>{errors.sweetQuantity?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="IngredientName">{t("ingredientName")}</label>
          <input
            defaultValue={
              formState.defaultValues?.payload?.ingredientName ?? ""
            }
            {...register("ingredientName")}
            type="text"
          />
          {errors.ingredientName?.message && (
            <small>{errors.ingredientName?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="MeasureUnit">{t("measureUnit")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.measureUnit ?? ""}
            {...register("measureUnit")}
            type="text"
          />
          {errors.measureUnit?.message && (
            <small>{errors.measureUnit?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Amount">{t("amount")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.amount ?? ""}
            {...register("amount")}
            type="text"
          />
          {errors.amount?.message && <small>{errors.amount?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Price">{t("price")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.price ?? ""}
            {...register("price")}
            type="text"
          />
          {errors.price?.message && <small>{errors.price?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Description">{t("description")}</label>
          <textarea
            defaultValue={formState.defaultValues?.payload?.description ?? ""}
            {...register("description")}
            type="text"
          ></textarea>
          {errors.description?.message && (
            <small>{errors.description?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Category">{t("category")}</label>
          <TypeSelect onChange={handleSelectChange} value={field.value} />
          {errors.category?.message && (
            <small>{errors.category?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Image">{t("cover")}</label>
          <input
            onChange={(event) => {
              setFileValue(event.target.files[0]);
            }}
            type="file"
            name="Image"
            required
          />
        </div>
        {!enteredFileIsValid && (
          <small>Campo obbligatorio, inserire la cover del film</small>
        )}
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
      </form>
    </section>
  );
};

export default FilmForm;
