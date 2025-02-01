import { Container, Row, Col, Button } from "react-bootstrap";
import { useContractData } from "../context/ContractDataContext";

const HeroSection = () => {
  // Fetch contract data
  const { data } = useContractData();

  // const heroBgColor = import.meta.env.VITE_APP_HERO_BG_COLOR || "#000000";
  const heroTextColor = import.meta.env.VITE_APP_HERO_TEXT_COLOR || "#ffffff";
  const buttonTextColor = import.meta.env.VITE_APP_HEROSECTION_BUTTON_TEXT_COLOR || "#000000";
  const highlightTextColor = import.meta.env.VITE_APP_HEIGHTLIGHT_TEXT_COLOR || "#0d6efd";
  const textHeadingColor = import.meta.env.VITE_APP_TEXT_HEADING_COLOR || "#ffcc00";
  const cardBgColor = import.meta.env.VITE_APP_HERO_SECTION_CARD_BG_COLOR || "#252121";
  const buttonOutlineColor = import.meta.env.VITE_APP_BUTTON_OUTLINE_COLOR || "#007bff";
  const contractBalanceColor = import.meta.env.VITE_APP_CONTRACT_BALANCE_COLOR || "#ffc107";
  const withdrawnColor = import.meta.env.VITE_APP_WITHDRAWN_COLOR || "#ffc107";
  const presentationLink = import.meta.env.VITE_APP_PRESENTATION_LINK || "P3 BNBCLUB PPTV.pdf";
 
  const basicInterestRate = import.meta.env.VITE_APP_BASIC_INTEREST_RATE || 1.5;
  const heroSectionTitleText = import.meta.env.VITE_APP_HEROSECTION_TITLE_TEXT || "BNB: Pioneering a decentralized tomorrow";
  const heroBgImage = import.meta.env.VITE_APP_HERO_BG_IMAGE || "./images/hero-bg.jpg";
  const borderColor = import.meta.env.VITE_APP_CARD_BORDER_COLOR || "#dee2e6";
  const HoldBonus = import.meta.env.VITE_APP_HEROSECTION_PERSONAL_HOLD_BONUS || '0.1% for Every 24 hrs without withdrawal';
  const AmountBalance = import.meta.env.VITE_APP_HEROSECTION_CONTRACT_AMOUNT_BONUS || '0.1% for Every 24 hrs without withdrawal';
 

  const buttonStyle = {
    backgroundColor: textHeadingColor,
    color: buttonTextColor,
    fontWeight: "bold",
    border: `1px solid ${buttonOutlineColor}`,
    height: '60px', 
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const cardStyle = {
    backgroundColor: cardBgColor,
    color: heroTextColor,
    padding: "1.5rem",
    boxShadow: "0 0.25rem 0.75rem rgba(0, 224, 220, 0.54)",
    borderRadius: "0.5rem",
    border: `2px solid ${borderColor}`,
  };

  return (
    <Container style={{  backgroundImage: `url(${heroBgImage})`, backgroundSize: 'cover'  }}>
      <Row className="g-4 mt-5">
        <Col lg={6} md={6} className="d-flex align-items-stretch">
          <div style={cardStyle} className="d-flex flex-column justify-content-center w-100">
            <h2 className="fw-bold mb-4" style={{ color: textHeadingColor }}>{heroSectionTitleText}</h2>
            <div>
              <p className="mb-3">
                <strong>Basic interest rate:</strong>{" "}
                <span style={{ color: highlightTextColor }}>{basicInterestRate}</span>
              </p>
              <p className="mb-3">
                <strong>Personal hold-bonus:</strong>{" "}
                <span style={{ color: highlightTextColor }}>{HoldBonus}</span>
              </p>
              <p className="mb-3">
                <strong>Contract total amount bonus:</strong>{" "}
                <span style={{ color: highlightTextColor }}>{AmountBalance}</span>
              </p>
            </div>
            <div className="d-flex gap-3 mt-4 justify-content-center">
              <Button href={presentationLink} target="_blank" rel="noopener noreferrer" style={buttonStyle}>Presentation</Button>
               <Button
                variant="outline-light"
                className=" "
                style={
                  buttonStyle
                }
                onClick={() =>
                  window.open(import.meta.env.VITE_SMART_CONTRACT || "", "_blank")
                }
              >
                Smart Contract
              </Button>
              
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} className="d-flex align-items-stretch">
          <div style={cardStyle} className="d-flex flex-column justify-content-center w-100">
            <div className="mb-4">
              <h1 style={{ fontWeight: 'bold' }}>Contract Balance</h1>
              <p id="contract-balance" className="fs-5 fw-bold" style={{ color: contractBalanceColor }}>
                {data?.contractBalance || "0.000"} BNB
              </p>
            </div>
            <div>
              <h1 style={{ fontWeight: 'bold' }}>Total Withdrawn</h1>
              <p id="withdrawandata" className="fs-5 fw-bold" style={{ color: withdrawnColor }}>
                {data?.withdrawnData || "0.000"} BNB
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
