import classes from "./companyInfo.module.scss";
import { useTranslation } from "react-i18next";

const CompanyInfo = () => {
  const { t } = useTranslation();

  return (
    <section className={classes.companyInfo}>
      <h1>{t("welcome")}</h1>
      <div>
        <p>{t("labels.backOffice")}</p>
        <p>{t("labels.developmentTeam")}</p>
      </div>
    </section>
  );
};

export default CompanyInfo;
