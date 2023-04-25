import Login from "../components/UI/form/loginForm";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import NavBar from "../components/nav/NavBar";

const LoginForm = () => {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <Login />
      <Footer />
    </>
  );
};

export default LoginForm;
