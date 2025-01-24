import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ContractData,
  HeroSection,
  Copyright,
  Deposit,
  Levels,
  Navbars,
  Referral,
  ReferralLinkData,
} from "./components";

const App: React.FC = () => {
  useEffect(() => {
    document.title = import.meta.env.VITE_APP_TITLE || "Bnbclub";
    const favicon = document.querySelector(
      "link[rel*='icon']"
    ) as HTMLLinkElement;
    if (favicon) {
      favicon.href = import.meta.env.VITE_APP_FAVICON_ICON || "";
    }
  }, []);
  const bgColor = import.meta.env.VITE_APP_BG_COLOR || "#f8f9fa"; // Default background color
  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <Navbars />

      <div className="w-100" style={{ height: "60vh",marginTop:"5rem" }}>
        <HeroSection />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 mb-4">
            <ContractData />
          </div>
        </div>

        <div className="col-lg-12 col-md-12 mb-4">
          <Deposit />
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 mb-4">
            <ReferralLinkData />
          </div>
        </div>
        <div className="col-lg-12 col-md-12 mb-4">
          <Referral />
        </div>

        <div className="col-lg-12 col-md-12 mb-4">
          <Levels />
        </div>
      </div>

      <div className="col-lg-12 col-md-12 ">
        <Copyright />
      </div>
    </div>
  );
};

export default App;
