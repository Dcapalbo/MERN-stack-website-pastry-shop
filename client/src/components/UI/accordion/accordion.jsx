import classes from "./accordion.module.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Accordion = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  const accordionData = [
    {
      headline: t("vision"),
      description: t("visionDescription"),
    },
    {
      headline: t("ethics"),
      description: t("ethicsDescription"),
    },
    {
      headline: t("team"),
      description: t("teamDescription"),
    },
  ];

  const toggleAccordion = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
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
                  selected === i
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
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
