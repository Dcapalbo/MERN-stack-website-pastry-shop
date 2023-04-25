import { forgotPasswordSchema } from "../../../schema/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import React from "react";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: "",
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { errors } = formState;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirmHandler = (event) => {
    const { email } = event;

    const formData = new FormData();

    formData.append("email", email);

    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_LOCAL_PORT}/forgot-password`, formData)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.error("there is an error for the login form: ", err);
        setIsLoading(false);
        setError(err);
      });
  };

  return (
    <section className={classes.form__wrapper}>
      <form
        onSubmit={handleSubmit(confirmHandler)}
        className={classes.form__container}
      >
        <div className={classes.form__container__item}>
          <h4>{t("labels.emailLabel")}</h4>
          <label htmlFor="Email">{t("genericInfo.email")}</label>
          <input {...register("email")} type="email" />
          {errors.email?.message && <small>{errors.email?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <button className={classes.secondary__button} type="submit">
            {t("confirmAction")}
          </button>
        </div>
        {error && <small>{t("errors.forgotPassword")}</small>}
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

export default ForgotPassword;
