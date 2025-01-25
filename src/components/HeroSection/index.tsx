import { Container, Row, Col, Button } from "react-bootstrap";
import bgimage from "../../assets/slider.jpg";

const HeroSection = () => {
  // Environment variable values
  const heroTextColor = import.meta.env.VITE_APP_HERO_TEXT_COLOR || "#000000";
  const textHeadingColor = import.meta.env.VITE_APP_TEXT_HEADING_COLOR || "#000000";

  const withdrawnColor = import.meta.env.VITE_APP_WITHDRAWN_COLOR || "#ffc107";
  const presentationLink =
    import.meta.env.VITE_APP_PRESENTATION_LINK || "P3 BNBCLUB PPTV.pdf";
  const depositLink = import.meta.env.VITE_APP_DEPOSIT_LINK || "#deposit";

  const buttonStyle = {
    backgroundColor: textHeadingColor,
    color: "#000",  
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
    <Container style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="w-100 h-100">
      <Row className="g-4">
        {/* Left Section: Profit Info */}
        <Col lg={6} md={6} className="d-flex align-items-stretch">
          <div style={cardStyle} className="d-flex flex-column w-100">
            <h2 className="fw-bold mb-4" style={{ color: textHeadingColor }}>BNB: Pioneering a decentralized tomorrow</h2>
            <div>
              <p className="mb-3">
                <strong>Basic interest rate:</strong>{" "}
                <span className="text-primary">1.5% every 24 hrs</span>
              </p>
              <p className="mb-3">
                <strong>Personal hold-bonus:</strong>{" "}
                <span className="text-primary">
                  +0.1% for every 24 hrs without withdrawal
                </span>
              </p>
              <p className="mb-3">
                <strong>Contract total amount bonus:</strong>{" "}
                <span className="text-primary">
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
                0.000
              </p>
            </div>
            <div>
              <h1 style={{fontWeight: 'bold'}}>Total Withdrawn</h1>
              <p
                id="withdrawandata"
                className="fs-5 fw-bold"
                style={{ color: withdrawnColor }}
              >
                0.000
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
