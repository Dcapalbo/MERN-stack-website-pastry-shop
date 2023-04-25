import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import classes from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.footer__container__elm}>
          <p>Partita Iva: 364667737727</p>
          <p>Pasticceria delizie s.r.l.</p>
          <p>Telefono: 06 1234567</p>
          <p>Email: info@pasticceriadelizie.it</p>
          <p>Copyright © 2023 Pasticceria delizie s.r.l.</p>
        </div>
        <div className={classes.footer__container__elm}>
          <p>Orari di apertura:</p>
          <p>Lunedi - Sabato</p>
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
