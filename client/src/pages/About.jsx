import AboutVideo from "../assets/video/pexels-los-muertos-crew-8477935-1920x1080-24fps.mp4";
import AboutCardContainer from "../components/UI/card/aboutCardContainer";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import NavBar from "../components/nav/NavBar";
import Hero from "../components/hero/hero";

const About = () => {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <Hero videoSrc={AboutVideo} />
      <AboutCardContainer />
      <Footer />
    </>
  );
};

export default About;
