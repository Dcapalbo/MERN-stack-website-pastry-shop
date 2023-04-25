import ForgotPassword from "../components/UI/form/forgotPassword";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import NavBar from "../components/nav/NavBar";

const ForgotPasswordForm = () => {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <ForgotPassword />
      <Footer />
    </>
  );
};

export default ForgotPasswordForm;
