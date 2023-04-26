import DetailSweet from "../components/UI/detailSweet/detailSweet";
import Navigation from "../components/nav/Navigation";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

const Sweet = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <DetailSweet />
      <Footer />
    </>
  );
};

export default Sweet;
