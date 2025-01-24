import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Referral = () => {
  // Get environment variable values
  const bgColor = import.meta.env.VITE_APP_REFERRAL_BG_COLOR || "#f8f9fa"; // Default background color
  const textColor = import.meta.env.VITE_APP_REFERRAL_TEXT_COLOR || "#000000"; // Default text color
  const cardBgColor = import.meta.env.VITE_APP_REFERRAL_CARD_BG_COLOR || "#ffffff"; // Default card background color
  const cardTextColor =
    import.meta.env.VITE_APP_REFERRAL_CARD_TEXT_COLOR || "#000000"; // Default card text color
  const buttonColor = import.meta.env.VITE_APP_BUTTON_COLOR || "#007bff"; // Default button color
  const buttonHoverColor =
    import.meta.env.VITE_APP_BUTTON_HOVER_COLOR || "#0056b3"; // Default button hover color

  return (
    <div className="roadmap-area py-5" style={{ backgroundColor: bgColor }}>
      <Container>
        <div className="referral">
          <h2 className="mb-4 text-center" style={{ color: textColor }}>
            Referral
          </h2>

          {/* Referral Link Section */}
          <div className="d-flex align-items-center justify-content-center mb-4">
            <span
              id="referralLink"
              className="fs-5 text-muted"
              style={{ color: textColor }}
            >
              You will get your ref link after investing...
            </span>
            <Button
              id="copyButton"
              variant="outline-primary"
              className="ms-3"
              style={{
                borderColor: buttonColor,
                color: buttonColor,
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  buttonHoverColor;
                (e.target as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "transparent";
                (e.target as HTMLButtonElement).style.color = buttonColor;
              }}
            >
              Copy
            </Button>
          </div>

          {/* Referral Stats Section */}
          <Row>
            <Col md={6} className="mb-3">
              <Card
                className="shadow-sm p-3"
                style={{ backgroundColor: cardBgColor, color: cardTextColor }}
              >
                <Card.Body>
                  <h3>Total Reward</h3>
                  <p id="usertotalreferralbonus" className="fs-4 fw-bold">
                    0.000 BNB
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card
                className="shadow-sm p-3"
                style={{ backgroundColor: cardBgColor, color: cardTextColor }}
              >
                <Card.Body>
                  <h3>Total Referral</h3>
                  <p id="countdownline" className="fs-4 fw-bold">
                    0
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Referral;
