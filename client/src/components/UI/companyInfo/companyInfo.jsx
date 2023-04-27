import classes from "./companyInfo.module.scss";
import { useTranslation } from "react-i18next";

const CompanyInfo = () => {
  const { t } = useTranslation();

  return (
    <section className={classes.companyInfo}>
      <h1>{t("welcome")}</h1>
      <div>
        <p>
          Benvenuto nell'area di back office dell'applicativo! Questa sezione è
          riservata agli amministratori del sito e al team di sviluppo, che si
          occupano della gestione dei contenuti e delle funzionalità. Come
          potete notare, a lato del vostro schermo, c'è un menu di navigazione
          che vi permette di accedere alle varie sezioni del back office. Grazie
          a questo menu potrete facilmente gestire e creare determinati
          contenuti. Tra le varie funzionalità che potete utilizzare, c'è la
          possibilità di creare dei dolci. Per farlo, basta accedere alla
          sezione "Dolci" e compilare il form dedicato. Potete inserire il nome
          del dolce, la descrizione, gli ingredienti, le unita di misurà, le
          quantità, le categorie. Inoltre, potete anche caricare una foto del
          dolce per renderlo ancora più invitante! Se invece dovete cancellare o
          modificare un dolce, vi basterà cliccare sul link "Tutti i dolci" da
          li potrete vedere i vostri dolci attualmente disponibili, modificarli
          e all'occorrenza cancellarli. Se volete tornare alla vista del sito
          principale, basta cliccare su "Home" nel menu di navigazione. Inoltre,
          se avete finito di utilizzare il back office, è importante eseguire il
          log out per garantire la sicurezza del vostro account. Se invece avete
          bisogno di creare un nuovo account, potete farlo cliccando su "Crea
          Account" nel menu di navigazione. Vi verrà chiesto di inserire le
          informazioni richieste e, una volta confermato l'account, potrete
          accedere al back office. Infine, se avete dimenticato la vostra
          password, potete resettarla cliccando su "Reimposta la Password" e
          seguendo le istruzioni fornite. Una volta inserita la nuova password,
          potete accedere nuovamente al back office.
        </p>
        <p>Buona giornata</p>
        <p>Il team di sviluppo</p>
      </div>
    </section>
  );
};

export default CompanyInfo;
