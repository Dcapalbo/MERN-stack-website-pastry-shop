import SweetCardContainer from "../components/UI/card/sweetCardContainer";
import classes from "../assets/genericPages.module.scss";
import Aside from "../components/UI/aside/aside";

const AuthHome = () => {
  return (
    <>
      <section className={classes.aside__wrapper}>
        <Aside />
        <SweetCardContainer />
      </section>
    </>
  );
};

export default AuthHome;
