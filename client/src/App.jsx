// importing the react router dom version 6
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isAuth } from "./utils/isAuth";
// importing the react traductions functions
import { dataSweetActions } from "./store/data-sweet-slice";
import { initReactI18next } from "react-i18next";
import { translationIt } from "./utils/i18It";
import { translationEn } from "./utils/i18En";
import ApiGetHook from "./hooks/apiGetHook";
import i18n from "i18next";
// scss files
import "./assets/typography.scss";
import "./assets/reset.scss";
// pages
import Home from "./pages/Home";
import AuthHome from "./pages/AuthHome";
import NewSweet from "./pages/NewSweet";
import LoginForm from "./pages/LoginForm";
import UpdateSweet from "./pages/UpdateSweet";
import Sweet from "./pages/Sweet";
import AuthSignUp from "./pages/AuthSignUp";
import ForgotPasswordForm from "./pages/ForgotPassword";
import AuthAllSweets from "./pages/AuthAllSweets";
import ResetPasswordForm from "./pages/ResetPassword";

// initialize the react traductions
i18n.use(initReactI18next).init({
  resources: {
    it: { translation: translationIt },
    en: { translation: translationEn },
  },
  lng: "it",
  fallbackLng: "it",
  interpolation: { escapeValue: false },
});

const App = () => {
  const dispatch = useDispatch();

  const { sweets } = ApiGetHook(
    `${process.env.REACT_APP_API_LOCAL_PORT}/get-sweets`
  );

  const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  const token = useSelector((state) => state.userLogin.token);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(() => {});

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
    setTokenExpiration(isAuth(token));
    dispatch(dataSweetActions.setSweetsData(sweets));
  }, [isLoggedIn, token, dispatch, sweets]);

  return (
    <Router>
      <Routes>
        {/* not authenticated Routes  */}
        <Route path="/home" element={<Home />} />
        <Route path="/sweet/:slug" element={<Sweet />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/sign-up" element={<AuthSignUp />} />

        {/* authenticated Routes  */}
        {isAuthenticated && tokenExpiration && (
          <Route path="/admin/home" element={<AuthHome />} />
        )}
        {isAuthenticated && tokenExpiration && (
          <Route path="/admin/sweets" element={<AuthAllSweets />} />
        )}
        {isAuthenticated && tokenExpiration && (
          <Route path="/admin/add-new-sweet" element={<NewSweet />} />
        )}
        {isAuthenticated && tokenExpiration && (
          <Route path="/admin/update-sweet" element={<UpdateSweet />} />
        )}
        {isAuthenticated && tokenExpiration && (
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
