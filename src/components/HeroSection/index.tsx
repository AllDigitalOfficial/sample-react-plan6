import { Container, Row, Col, Button } from "react-bootstrap";
import bgimage from "../../assets/slider.jpg";
import { useContractData } from "../context/ContractDataContext";

const HeroSection = () => {
  // Fetch contract data
  const { data } = useContractData();

  const heroTextColor = import.meta.env.VITE_APP_HERO_TEXT_COLOR || "#000000";
  const textHeadingColor = import.meta.env.VITE_APP_TEXT_HEADING_COLOR || "#000000";
  const buttoncolor = import.meta.env.VITE_APP_HEROSECTION_BUTTON_TEXT_COLOR || "#007bff";
  const withdrawnColor = import.meta.env.VITE_APP_WITHDRAWN_COLOR || "#ffc107";
  const presentationLink =
    import.meta.env.VITE_APP_PRESENTATION_LINK || "P3 BNBCLUB PPTV.pdf";
  const depositLink = import.meta.env.VITE_APP_DEPOSIT_LINK || "#deposit";
  const basicInterestRate = import.meta.env.VITE_APP_BASIC_INTEREST_RATE || "1.5";
  const heightLightTextColor = import.meta.env.VITE_APP_HEIGHTLIGHT_TEXT_COLOR || "#0d6efd";
  const herosectiontitletext = import.meta.env.VITE_APP_HEROSECTION_TITLE_TEXT || "BNB: Pioneering a decentralized tomorrow";
  const buttonStyle = {
    backgroundColor: textHeadingColor,
    color: buttoncolor,  
    fontWeight: "bold",
    border: "none",
    height: '60px', 
    width: '170px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };


  const cardStyle = {
    color: heroTextColor,
    padding: "1.5rem",
    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
    borderRadius: "0.5rem",
    // border: "1px solid #dee2e6",
  };

  return (
    <Container style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '70vh' }}>
      <Row className="g-4" >
      {/* Left Section: Profit Info */}
      <Col lg={6} md={6} className="d-flex align-items-stretch">
        <div style={cardStyle} className="d-flex flex-column  justify-content-center w-100">
        <h2 className="fw-bold mb-4" style={{ color: textHeadingColor }}>{herosectiontitletext}</h2>
        <div>
          <p className="mb-3">
          <strong>Basic interest rate:</strong>{" "}
           
          <span style={{ color: heightLightTextColor }}>
          {basicInterestRate}% every 24 hrs
          </span>
          </p>
          <p className="mb-3">
          <strong>Personal hold-bonus:</strong>{" "}
          <span style={{ color: heightLightTextColor }}>
            +0.1% for every 24 hrs without withdrawal
          </span>
          </p>
          <p className="mb-3">
          <strong>Contract total amount bonus:</strong>{" "}
          <span style={{ color: heightLightTextColor }}>
            +0.1% for every 500 BNB on platform address balance
          </span>
          </p>
        </div>
        <div className="d-flex gap-3 mt-4 justify-content-center">
          <Button
          href={presentationLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...buttonStyle }}
          >
          Presentation
          </Button>
          <Button href={depositLink} style={{ ...buttonStyle}}>
          Deposit
          </Button>
        </div>
        </div>
      </Col>

      {/* Right Section: Contract Balance and User Info */}
      <Col lg={6} md={6} className="d-flex align-items-stretch">
        <div style={cardStyle} className="d-flex flex-column justify-content-center w-100">
        <div className="mb-4">
          <h1 style={{fontWeight: 'bold'}}>Contract Balance</h1>
          <p
          id="contract-balance"
          className="fs-5 fw-bold"
          style={{ color: textHeadingColor }}
          >
          {data?.contractBalance || "0.000"}
          </p>
        </div>
        <div>
          <h1 style={{fontWeight: 'bold'}}>Total Withdrawn</h1>
          <p
          id="withdrawandata"
          className="fs-5 fw-bold"
          style={{ color: withdrawnColor }}
          >
          {data?.withdrawnData || "0.000"}
          </p>
        </div>
        </div>
      </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
