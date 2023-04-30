import imageSustainability from "../../../assets/img/varietà.jpeg";
import imageVision from "../../../assets/img/visione.jpeg";
import imageTeam from "../../../assets/img/team.jpeg";
import classes from "./accordion.module.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Accordion = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0); // Set initial value to 0

  const accordionData = [
    {
      headline: t("vision"),
      description: t("visionDescription"),
      image: imageVision,
    },
    {
      headline: t("sustainability"),
      description: t("sustainabilityDescription"),
      image: imageSustainability,
    },
    {
      headline: t("team"),
      description: t("teamDescription"),
      image: imageTeam,
    },
  ];

  const toggleAccordion = (i) => {
    if (selected === i) {
      setSelected(null); // Set selected to null if user clicks on already selected item
    } else {
      setSelected(i);
    }
  };
  return (
    <div className={classes.wrapper__accordion}>
      <div className={classes.accordion}>
        {accordionData.map((item, i) => (
          <div
            key={i}
            className={classes.item}
            onClick={() => toggleAccordion(i)}
          >
            <div>
              <h2
                className={
                  selected === i || (i === 0 && !selected)
                    ? `${classes.active}`
                    : `${classes.accordion__title}`
                }
              >
                {item.headline}
              </h2>
            </div>
            <div
              className={
                i === 0 && !selected
                  ? `${classes.accordion__description__show}`
                  : selected === i
                  ? `${classes.accordion__description__show}`
                  : `${classes.accordion__description}`
              }
            >
              <p>{item.description}</p>
              <div className={classes.accordion__description__image__container}>
                <img
                  className={classes.accordion__image}
                  src={item.image}
                  alt={item.headline}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
