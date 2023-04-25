import ResetPassword from "../components/UI/form/resetPassword";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import NavBar from "../components/nav/NavBar";

const ResetPasswordForm = () => {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <ResetPassword />
      <Footer />
    </>
  );
};

export default ResetPasswordForm;
