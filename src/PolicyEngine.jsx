import "./style/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PolicyEngineCountry from "./PolicyEngineCountry";
import gtag from "./api/analytics";
import { StatusPage } from "./pages/StatusPage";
import { motion } from "framer-motion";
import React from "react";
import Button from "./controls/Button";
import style from "./style";
import useMobile from "./layout/Responsive";

/*
 * This component is split out of the main
 * component for testing purposes: you can't
 * have nested routers in a test.
 */

function CookieConsent() {
  /* An animated bottom-left popup that asks the user to accept cookies */
  const [show, setShow] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  });

  const acceptCookies = () => {
    // Give animation time to finish
    setAccepted(true);
    setTimeout(() => {
      setShow(false);
    }, 500);

    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    });
  }

  const necessaryCookiesOnly = () => {
    // Give animation time to finish
    setAccepted(true);
    setTimeout(() => {
      setShow(false);
    }, 500);

    gtag('consent', 'update', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied'
    });
  }

  const mobile = useMobile();

  return (
    <>
    {show &&
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: accepted ? 0 : 1, y: accepted ? 200 : 0 }}
        transition={{ 
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="cookie-consent"
        style={{ 
          position: "fixed", bottom: 20, left: 0,
          padding: "1em", background: style.colors.WHITE,
          zIndex: 1000, borderRadius: 50, x: mobile ? 0 : "30%",
          display: "flex", alignItems: "center",
          flexDirection: mobile ? "column" : "row",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          paddingLeft: 20, paddingRight: 20,
      }}
      >
        <p style={{margin: 0, marginBottom: mobile && 20}}>
          This site uses cookies. By continuing to use
          this site, you agree to our use of cookies.
        </p>
        <div style={{display: "flex"}}>
        <Button onClick={acceptCookies} text="Accept" style={{marginLeft: 20}} primary/>
        <Button onClick={necessaryCookiesOnly} text="Necessary cookies only" style={{marginLeft: 20}} />
        </div>
      </motion.div>
    }
    </>
  );
}
export function PolicyEngineRoutes() {
  // Look up the country ID from the user's browser language
  const browserLanguage = navigator.language;
  const countryId = browserLanguage === "en-US" ? "us" : "uk";
  return (
    <Routes>
      <Route path="/uk/*" element={<PolicyEngineCountry countryId="uk" />} />
      <Route path="/us/*" element={<PolicyEngineCountry countryId="us" />} />
      <Route path="/ca/*" element={<PolicyEngineCountry countryId="ca" />} />
      <Route path="/ng/*" element={<PolicyEngineCountry countryId="ng" />} />
      <Route path="/api-status" element={<StatusPage />} />
      <Route path="/*" element={<Navigate to={`/${countryId}`} />} />
    </Routes>
  );
}

export default function PolicyEngine() {
  gtag("js", new Date());
  gtag("config", "G-91M4529HE7");
  return (
    <>
    <Router>
      <PolicyEngineRoutes />
    </Router>
    <CookieConsent />
    </>
  );
}
