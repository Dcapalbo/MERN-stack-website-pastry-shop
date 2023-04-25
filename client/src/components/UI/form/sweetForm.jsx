import { dataSweetActions } from "../../../store/data-sweet-slice";
import { sweetSchema } from "../../../schema/sweetSchema";
import { slugCreation } from "../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";

const SweetForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uriLocation = window.location.href;

  const dataUpdateSweet = useSelector(
    (state) => state.dataSweet.SweetData ?? null
  );

  const { register, handleSubmit, formState } = useForm({
    defaultValues: dataUpdateSweet ?? "",
    resolver: zodResolver(sweetSchema),
  });

  useEffect(() => {
    setIsUpdate(uriLocation.includes("update-sweet"));
    if (!uriLocation.includes("update-sweet")) {
      dispatch(dataSweetActions.resetSweetData());
    }
  }, [uriLocation, dispatch]);

  const { errors } = formState;

  const [enteredFileIsValid, setEnteredFileisValid] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", measureUnit: "" },
  ]);

  const confirmHandler = (event) => {
    const enteredFileIsValid = file !== null && file !== "";
    setEnteredFileisValid(enteredFileIsValid);

    const formData = new FormData();
    const { sweetName, price, description } = event;

    formData.append("sweetName", sweetName ?? "");
    formData.append("price", price ?? "");
    formData.append("slug", slugCreation(sweetName));
    // formData.append("type", type); maybe we are going to see how the time is running
    formData.append("description", description ?? "");
    formData.append("file", file ?? "");

    if (dataUpdateSweet?._id) {
      formData.append("_id", dataUpdateSweet?._id);
    }

    if (formData.entries().next().done === false) {
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
            navigate("/admin/home");
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
            navigate("/admin/home");
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
            ? !isUpdate && <h4>{t("labels.addDbFilm")}</h4>
            : isUpdate && <h4>{t("labels.modifyDbFilm")}</h4>}
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
          <label htmlFor="Director">{t("director")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.director ?? ""}
            {...register("director")}
            type="text"
          />
          {errors.director?.message && (
            <small>{errors.director?.message}</small>
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
            <small>Campo obbligatorio, inserire la cover del film</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          {!isUpdate
            ? !isUpdate && (
                <>
                  <button className={classes.secondary__button} type="submit">
                    {t("insertAction")}
                  </button>
                  <div className={classes.generic__margin__top}>
                    {error && <small>{t("errors.dbCrud")}</small>}
                  </div>
                </>
              )
            : isUpdate && (
                <>
                  <button className={classes.secondary__button} type="submit">
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
