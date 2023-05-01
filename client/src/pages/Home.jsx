import FilterDataSelect from "../components/UI/select/filterDataSelect";
import SweetCardContainer from "../components/UI/card/sweetCardContainer";
import { dataSelectActions } from "../store/data-select-slice";
import Accordion from "../components/UI/accordion/accordion";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Hero from "../components/hero/hero";
import NavBar from "../components/nav/NavBar";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Home = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const sendTypeHandler = (event) => {
    const value = event.target.value;
    dispatch(dataSelectActions.setDataCategory(value));
    setCategory(value);
  };

  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <Hero />
      <Accordion />
      <FilterDataSelect onChange={sendTypeHandler} category={category} />
      <SweetCardContainer />
      <Footer />
    </>
  );
};

export default Home;
