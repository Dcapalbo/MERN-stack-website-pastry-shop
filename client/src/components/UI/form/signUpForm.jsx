import { dataUserActions } from "../../../store/data-user-slice";
import { signUpSchema } from "../../../schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./genericForm.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import React from "react";
import LoadingSpinner from "../spinner/loadingSpinner";

const SignUpForm = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: "",
    resolver: zodResolver(signUpSchema),
  });

  const { errors } = formState;
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmHandler = (event) => {
    const { name, email, password } = event;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_LOCAL_PORT}/sign-up`, formData)
      .then((res) => {
        console.log(res.data);
        dispatch(dataUserActions.logout());
        navigate("/login");
      })
      .catch((err) => {
        console.error(
          "there is an error for the creation of the user account, the user could be already been registered: ",
          err
        );
        setIsLoading(false);
        setError(err);
      });
  };

  return (
    <section className={classes.form__wrapper + " " + classes.generic__padding}>
      <form
        onSubmit={handleSubmit(confirmHandler)}
        className={classes.form__container}
      >
        <div className={classes.form__container__item}>
          <h4>{t("labels.signUpLabel")}</h4>
          <label htmlFor="Name">{t("genericInfo.name")}</label>
          <input {...register("name")} type="text" />
          {errors.name?.message && <small>{errors.name?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Email">{t("genericInfo.email")}</label>
          <input {...register("email")} type="email" />
          {errors.email?.message && <small>{errors.email?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Password">{t("password")}</label>
          <input {...register("password")} type="password" />
        </div>
        {errors.password?.message && <small>{errors.password?.message}</small>}
        <div className={classes.form__container__item}>
          <button className={classes.primary__button} type="submit">
            {t("createAccount")}
          </button>
        </div>
        {error && <small>{t("errors.signUp")}</small>}
        {isLoading && <LoadingSpinner />}
      </form>
    </section>
  );
};

export default SignUpForm;
