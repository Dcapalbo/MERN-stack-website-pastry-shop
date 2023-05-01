import HomeVideo from "../../assets/img/pexels-taryn-elliott-3325984-1920x1080-24fps.mp4";
import classes from "./hero.module.scss";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <video
        className={classes.home__video}
        autoPlay="autoPlay"
        controls={false}
        muted
        loop
      >
        <source src={HomeVideo} type="video/mp4" />
      </video>
    </section>
  );
};

export default Hero;
