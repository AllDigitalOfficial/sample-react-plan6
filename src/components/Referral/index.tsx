import  { useState } from "react";
import { Container, Row, Col, Card, Button, Alert} from "react-bootstrap";
import { useContractData } from "../context/ContractDataContext";


const Referral = () => {
  // Fetch contract data
  const { data } = useContractData();
  const [showAlert, setShowAlert] = useState(false);

  const handleCopy = () => {
    const referralLink = data?.referralLink || "";
    navigator.clipboard.writeText(referralLink);
    setShowAlert(true);

    // Hide alert after 2 seconds
    setTimeout(() => setShowAlert(false), 2000);
  }


  const bgColor = import.meta.env.VITE_APP_REFERRAL_BG_COLOR || "#f8f9fa"; // Default background color
  const textColor = import.meta.env.VITE_APP_REFERRAL_TEXT_COLOR || "#000000"; // Default text color
  const cardBgColor = import.meta.env.VITE_APP_REFERRAL_CARD_BG_COLOR || "#ffffff"; // Default card background color
  const cardTextColor = import.meta.env.VITE_APP_REFERRAL_CARD_TEXT_COLOR || "#000000"; // Default card text color
  const buttonColor = import.meta.env.VITE_APP_BUTTON_COLOR || "#007bff"; // Default button color
  const buttonHoverColor = import.meta.env.VITE_APP_BUTTON_HOVER_COLOR || "#0056b3"; // Default button hover color
  const borderColor = import.meta.env.VITE_APP_CARD_BORDER_COLOR || "#dee2e6"; // Default border color
  const borderBoxShadow = import.meta.env.VITE_APP_CARD_BOX_SHADOW_COLOR || "0 0.25rem 0.75rem rgba(13, 236, 236, 0.6)"; // Default border shadow color


  
  return (
    <div className="roadmap-area py-5" style=
      {{
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0.25rem 0.75rem ${borderBoxShadow}`
      }}>
      <Container>
        <div className="referral">
          <h2 className="mb-4 text-center" style={{
            color: textColor

          }}>
            Referral
          </h2>

          {/* Referral Link Section */}
          <div className="d-flex align-items-center justify-content-center mb-4">
            <span
              id="referralLink"
              className="fs-5 text-wrap"
              style={{ color: textColor, wordBreak: "break-word" }}
            >
              {data?.referralLink || "You will get your ref link after investing"}
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
                (e.target as HTMLButtonElement).style.backgroundColor = buttonHoverColor;
                (e.target as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.target as HTMLButtonElement).style.color = buttonColor;
              }}
              onClick={handleCopy}
            >
              Copy
            </Button>
          </div>

          {/* Alert for Copy */}
          {showAlert && (
            <Alert
              variant="success"
              className="position-fixed bottom-0 end-0 mb-3 me-3"
              style={{ zIndex: 1050 }}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Referral link copied!
            </Alert>
          )}

          {/* Referral Stats Section */}
          <Row className="justify-content-center">
            <Col md={4} className="mb-3">
              <Card
                
                style={{
                  backgroundColor: cardBgColor, color: cardTextColor,

                  border: `2px solid ${borderColor}`,
                  
                }}
              >
                <Card.Body>
                  <h3>Total Reward</h3>
                  <p id="usertotalreferralbonus" className="fs-4 fw-bold">
                    {data?.userTotalReward || 0.00} BNB
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card
                
                style={{
                  backgroundColor: cardBgColor, color: cardTextColor,

                  border: `2px solid ${borderColor}`,
                 
                }}
              >
                <Card.Body>
                  <h3>Total Referral</h3>
                  <p id="countdownline" className="fs-4 fw-bold">
                    {data?.userTotalReferral || 0}
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
