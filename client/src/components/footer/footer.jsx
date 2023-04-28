import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import classes from "./footer.module.scss";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.footer__container__elm}>
          <p>{t("footer.vatNumber")}: 364667737727</p>
          <p>{t("footer.pastry")} Luana&Maria s.r.l.</p>
          <p>{t("footer.phoneNumber")}: 06 1234567</p>
          <p>Email: info@pasticcerialuana&maria.it</p>
          <p>Copyright © 2023 Pasticceria Luana&Maria s.r.l.</p>
        </div>
        <div className={classes.footer__container__elm}>
          <p>{t("footer.hours")}:</p>
          <p>
            {t("footer.monday")} - {t("footer.saturday")}
          </p>
          <p>08:00 - 13:00</p>
          <p>14:00 - 19:00</p>
        </div>
        <div className={classes.footer__container__elm}>
          <a href="https://www.facebook.com/">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://www.instagram.com/">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.linkedin.com/">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
