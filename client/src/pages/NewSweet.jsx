import SweetForm from "../components/UI/form/sweetForm";
import Navigation from "../components/nav/Navigation";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

const NewSweet = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <SweetForm />
      <Footer />
    </>
  );
};

export default NewSweet;
