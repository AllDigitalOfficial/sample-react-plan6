import { Container, Row, Col, Button } from "react-bootstrap";

const HeroSection = () => {
  // Environment variable values
  const heroBgColor = import.meta.env.VITE_APP_HERO_BG_COLOR || "#f8f9fa";
  const heroTextColor = import.meta.env.VITE_APP_HERO_TEXT_COLOR || "#000000";
  const buttonColor = import.meta.env.VITE_APP_BUTTON_COLOR || "#007bff";

  const contractBalanceColor =
    import.meta.env.VITE_APP_CONTRACT_BALANCE_COLOR || "#ffc107";
  const withdrawnColor = import.meta.env.VITE_APP_WITHDRAWN_COLOR || "#ffc107";
  const presentationLink =
    import.meta.env.VITE_APP_PRESENTATION_LINK || "P3 BNBCLUB PPTV.pdf";
  const depositLink = import.meta.env.VITE_APP_DEPOSIT_LINK || "#deposit";

  // Style objects for better reusability
  const buttonStyle = {
    backgroundColor: buttonColor,
    color: "#fff",
  };


  const cardStyle = {
    backgroundColor: "#fff",
    color: heroTextColor,
    padding: "1.5rem",
    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
    borderRadius: "0.5rem",
    border: "1px solid #dee2e6",
  };

  return (
    <Container style={{ backgroundColor: heroBgColor }} className="py-5">
      <Row className="g-4">
        {/* Left Section: Profit Info */}
        <Col lg={6} md={6} className="d-flex align-items-stretch">
          <div style={cardStyle} className="d-flex flex-column w-100">
            <h2 className="fw-bold mb-4">BNB: Pioneering a decentralized tomorrow</h2>
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
                style={buttonStyle}
              >
                Presentation
              </Button>
              <Button href={depositLink} style={buttonStyle}>
                Deposit
              </Button>
            </div>
          </div>
        </Col>

        {/* Right Section: Contract Balance and User Info */}
        <Col lg={6} md={6} className="d-flex align-items-stretch">
          <div style={cardStyle} className="d-flex flex-column justify-content-center w-100">
            <div className="mb-4">
              <h4>Contract Balance</h4>
              <p
                id="contract-balance"
                className="fs-5 fw-bold"
                style={{ color: contractBalanceColor }}
              >
                0.000
              </p>
            </div>
            <div>
              <h4>Total Withdrawn</h4>
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
