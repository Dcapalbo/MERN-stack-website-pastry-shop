import SignUp from "../components/UI/form/signUpForm";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import NavBar from "../components/nav/NavBar";

const AuthSignUp = () => {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <SignUp />
      <Footer />
    </>
  );
};

export default AuthSignUp;
