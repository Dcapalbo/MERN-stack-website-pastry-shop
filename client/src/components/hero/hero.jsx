import classes from "./hero.module.scss";

const Hero = ({ videoSrc }) => {
  return (
    <section className={classes.hero}>
      <video
        className={classes.hero__video}
        autoPlay="autoPlay"
        controls={false}
        muted
        loop
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </section>
  );
};

export default Hero;
