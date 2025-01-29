import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css';
import { ContractDataProvider } from "./components/context/ContractDataContext";

import { Web3ModalProvider } from "./providers/Web3ModalProvider";
import {
  ContractData,
  HeroSection,
  Footer,
  Deposit,
  Levels,
  Navbars,
  Referral,
  ReferralLinkData,
} from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const App: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  // Scroll logic for showing the "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top logic
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.title = import.meta.env.VITE_APP_TITLE || "Bnbclub";
    const favicon = document.querySelector(
      "link[rel*='icon']"
    ) as HTMLLinkElement;
    if (favicon) {
      favicon.href = import.meta.env.VITE_APP_FAVICON_ICON || "";
    }
  }, []);

  const bgColor = import.meta.env.VITE_APP_BG_COLOR || "#f8f9fa"; 
  const floatButtonColor = import.meta.env.VITE_APP_FLOATING_ICON_BACK_TO_TOP_COLOR || "#007bff";
  const floatHoverButtonColor = import.meta.env.VITE_APP_FLOATING_ICON_BACK_TO_TOP_HOVER_COLOR || "#007bff";

  return (
    <Web3ModalProvider>
    <ContractDataProvider>
      <div className="App" style={{ backgroundColor: bgColor }}>
        {/* Navbar */}
        <Navbars />
   
        <div className="container">
          {/* Hero Section */}
          <div className="col-12 mb-4 mt-6">
            <HeroSection />
          </div>

          {/* Contract Data */}
          <div className="col-12 mb-4">
            <ContractData />
          </div>

          {/* Deposit Section */}
          <div className="col-12 mb-4">
            <Deposit />
          </div>

          {/* Referral Link Data */}
          <div className="row">
            <div className="col-12 mb-4">
              <ReferralLinkData />
            </div>
          </div>

          {/* Referral Section */}
          <div className="col-12 mb-4">
            <Referral />
          </div>

          {/* Levels Section */}
          <div className="col-12">
            <Levels />
          </div>
        </div>

        {/* Back to Top Button */}
        {showButton && (
          <Button
            onClick={scrollToTop}
            className="back-to-top position-fixed"
            style={{
              bottom: "20px",
              backgroundColor: floatButtonColor,
              right: "20px",
              borderRadius: "20%",
              padding: "10px 15px",
              fontSize: "18px",
              boxShadow: floatHoverButtonColor,
              zIndex: 1000,
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </Button>
        )}

        {/* Footer Section */}
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </ContractDataProvider>
    </Web3ModalProvider>
  );
};

export default App;
