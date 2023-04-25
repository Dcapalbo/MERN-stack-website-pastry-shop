import { dataSweetActions } from "../../../store/data-sweet-slice";
import { useDispatch, useSelector } from "react-redux";
import StateGetHook from "../../../hooks/stateGetHook";
import base64ArrayBuffer from "../../../utils/base64";
import PuffLoader from "react-spinners/PuffLoader";
import ApiGetHook from "../../../hooks/apiGetHook";
import classes from "./cardContainer.module.scss";
import { useEffect, useState } from "react";
import SweetCard from "./sweetCard";

const SweetCardContainer = () => {
  const dispatch = useDispatch();
  let uriLocation = window.location.href;

  const typeData = useSelector((state) => state.dataType.dataType) || "";
  const [filteredData, setFilteredData] = useState([]);

  let films;
  let loading;
  let error;

  if (
    uriLocation === `${process.env.REACT_APP_CLIENT_LOCAL_PORT}/admin/films`
  ) {
    const apiData = ApiGetHook(
      `${process.env.REACT_APP_API_LOCAL_PORT}/get-films`
    );

    films = apiData.films;
    loading = apiData.loading;
    error = apiData.error;

    dispatch(dataSweetActions.setSweetsData(films));
  } else {
    //   const stateData = StateGetHook((state) => state.dataSweet.sweetsData);

    //   films = stateData.films;
    //   loading = stateData.loading;
    //   error = stateData.error;
    // }

    // useEffect(() => {
    //   if (films) {
    //     setFilteredData(films);
    //     if (typeData) {
    //       const filteredFilms = films.filter((film) => film.type === typeData);
    //       setFilteredData(filteredFilms);
    //     }
    //   }
    // }, [typeData, films]);

    // if (loading) {
    //   return (
    //     <PuffLoader
    //       style={{
    //         display: "inherit",
    //         position: "relative",
    //         width: "100px",
    //         height: "100px",
    //         margin: "auto",
    //       }}
    //       color={"#cc0000"}
    //       size={100}
    //     />
    //   );
    // } else if (error) {
    //   return (
    //     <h1 className={classes.text__align__center}>
    //       There are some problems, please try to refresh
    //     </h1>
    //   );
    // } else {
    return (
      <section className={classes.wrapper__card__container}>
        <div
          className={
            (filteredData.length > 2
              ? classes.card__container
              : classes.card__container,
            classes.justify__content__center)
          }
        >
          {filteredData.length > 0 ? (
            filteredData.map((film) => (
              <SweetCard
                title={film.title}
                director={film.director}
                production={film.production}
                screenwriter={film.screenwriter}
                directorOfPhotography={film.directorOfPhotography}
                synopsis={film.synopsis}
                imageUrl={`data:image/png;base64,${base64ArrayBuffer(film)}`}
                duration={film.duration}
                year={film.year}
                slug={film.slug}
                type={film.type}
                key={film._id}
                _id={film._id}
              />
            ))
          ) : (
            <h1>
              Non ci sono elementi per questa ricerca, inserirli manualmente
              presso la sezione del Database dedicata ai film
            </h1>
          )}
        </div>
      </section>
    );
  }
};

export default SweetCardContainer;
