import CompanyInfo from "../components/UI/companyInfo/companyInfo";
import classes from "../assets/genericPages.module.scss";
import Aside from "../components/UI/aside/aside";

const AuthHome = () => {
  return (
    <>
      <section className={classes.aside__wrapper}>
        <Aside />
        <CompanyInfo />
      </section>
    </>
  );
};

export default AuthHome;
