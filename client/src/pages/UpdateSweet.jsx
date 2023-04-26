import classes from "../assets/genericPages.module.scss";
import SweetForm from "../components/UI/form/sweetForm";
import Aside from "../components/UI/aside/aside";

const NewSweet = () => {
  return (
    <>
      <section className={classes.aside__wrapper}>
        <Aside />
        <SweetForm />
      </section>
    </>
  );
};

export default NewSweet;
