import { dataSweetActions } from "../../../store/data-sweet-slice";
import { sweetSchema } from "../../../schema/sweetSchema";
import { useController, useForm } from "react-hook-form";
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

const SweetForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uriLocation = window.location.href;

  let ciccio;

  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: ciccio ?? "",
    resolver: zodResolver(sweetSchema),
  });

  useEffect(() => {
    setIsUpdate(uriLocation.includes("update-sweet"));
    if (!uriLocation.includes("update-sweet")) {
      // dispatch(dataSweetActions.resetSweetData());
      console.log("siamo nel form update");
    }
  }, [uriLocation, dispatch]);

  const { errors } = formState;

  const { field } = useController({ name: "category", control });

  const [enteredFileIsValid, setEnteredFileisValid] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  // const [ingredients, setIngredients] = useState([
  //   { name: "", amount: "", measureUnit: "" },
  // ]);

  const handleSelectChange = (option) => {
    field.onChange(option.target.value);
  };

  const confirmHandler = (event) => {
    const enteredFileIsValid = file !== null && file !== "";
    setEnteredFileisValid(enteredFileIsValid);

    const formData = new FormData();
    const {
      sweetName,
      ingredientName,
      measureUnit,
      amount,
      price,
      description,
      category,
    } = event;

    formData.append("sweetName", sweetName ?? "");
    formData.append("sweetName", ingredientName ?? "");
    formData.append("sweetName", measureUnit ?? "");
    formData.append("sweetName", amount ?? "");
    formData.append("price", price ?? "");
    formData.append("slug", slugCreation(sweetName));
    formData.append("description", description ?? "");
    formData.append("type", category ?? "");
    formData.append("file", file ?? "");

    if (ciccio?._id) {
      formData.append("_id", ciccio?._id);
    }

    if (formData !== {}) {
      if (
        uriLocation ===
        `${process.env.REACT_APP_CLIENT_LOCAL_PORT}/admin/add-new-sweet`
      ) {
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
      } else if (
        uriLocation ===
        `${process.env.REACT_APP_CLIENT_LOCAL_PORT}/admin/update-sweet`
      ) {
        setIsLoading(true);

        axios
          .put(`${process.env.REACT_APP_API_LOCAL_PORT}/update-sweet`, formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(
              "there is an error for updating the specific sweet: ",
              err
            );
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
    <section className={classes.form__wrapper}>
      <form
        onSubmit={handleSubmit(confirmHandler)}
        className={classes.form__container}
      >
        <div className={classes.form__container__item}>
          {!isUpdate
            ? !isUpdate && <h4>{t("labels.addDbSweet")}</h4>
            : isUpdate && <h4>{t("labels.modifyDbSweet")}</h4>}
          <label htmlFor="Name">{t("sweetName")}</label>
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
          <label htmlFor="IngredientName">{t("ingredientName")}</label>
          <input
            defaultValue={
              formState.defaultValues?.payload?.IngredientName ?? ""
            }
            {...register("IngredientName")}
            type="text"
          />
          {errors.IngredientName?.message && (
            <small>{errors.IngredientName?.message}</small>
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
          <input
            defaultValue={formState.defaultValues?.payload?.description ?? ""}
            {...register("description")}
            type="text"
          />
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
              const file = event.target.files[0];
              setFile(file);
            }}
            type="file"
            name="Image"
            required
          />
          {!enteredFileIsValid && (
            <small>Campo obbligatorio, inserire l'immagine del dolce</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          {!isUpdate
            ? !isUpdate && (
                <>
                  <button className={classes.primary__button} type="submit">
                    {t("insertAction")}
                  </button>
                  <div className={classes.generic__margin__top}>
                    {error && <small>{t("errors.dbCrud")}</small>}
                  </div>
                </>
              )
            : isUpdate && (
                <>
                  <button className={classes.primary__button} type="submit">
                    {t("modifyAction")}
                  </button>
                  <div className={classes.generic__margin__top}>
                    {error && <small>{t("errors.dbCrud")}</small>}
                  </div>
                </>
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
            color={"#cc0000"}
            size={100}
          />
        )}
      </form>
    </section>
  );
};

export default SweetForm;
