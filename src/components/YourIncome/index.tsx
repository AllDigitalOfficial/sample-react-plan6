import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ReferralLinkData = () => {
  // Get environment variable values
  const bgColor = import.meta.env.VITE_APP_REFERRAL_LINK_BG_COLOR || "#f8f9fa"; // Default background color
  const textColor = import.meta.env.VITE_APP_REFERRAL_LINK_TEXT_COLOR || "#000000"; // Default text color
  const buttonColor = import.meta.env.VITE_APP_BUTTON_COLOR || "#007bff"; // Default button color
  const totalDepositColor =
    import.meta.env.VITE_APP_TOTAL_DEPOSIT_COLOR || "#28a745"; // Default color for Total Deposit card
  const totalWithdrawnColor =
    import.meta.env.VITE_APP_TOTAL_WITHDRAWN_COLOR || "#dc3545"; // Default color for Total Withdrawn card
  const returnsColor = import.meta.env.VITE_APP_RETURNS_COLOR || "#ffc107"; // Default color for Returns card
  const interestRateColor =
    import.meta.env.VITE_APP_INTEREST_RATE_COLOR || "#17a2b8"; // Default color for Interest Rate card
  const rateColor = import.meta.env.VITE_APP_RATE_COLOR || "#007bff"; // Default color for rate text

  // Centralized styles
  const cardStyle = {
    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    backgroundColor: buttonColor,
    color: "#fff",
    width: "100%",
  };

  return (
    <div className="expart-team-area py-5" style={{ backgroundColor: bgColor }}>
      <Container>
        <Row className="mb-4 justify-content-center">
          {/* Left Section: Income and Referral Info */}
          <Col lg={12} >
            <Card className="shadow-sm p-4" style={cardStyle}>
              <div className="mb-4 text-center">
                <h2 className="title mb-3" style={{ color: textColor }}>
                  Your Income
                </h2>
                <p
                  id="depositUser"
                  className="fs-4 fw-bold"
                  style={{ color: rateColor }}
                >
                  0.000 <span className="text-muted">BNB</span>
                </p>
                <Button id="withdraw-button" style={buttonStyle}>
                  Withdrawal
                </Button>
              </div>

              <div className="mb-4 text-center">
                <h3 className="title mb-3" style={{ color: textColor }}>
                  Referral Amount Available
                </h3>
                <p
                  id="userAvailabereferralbonus"
                  className="fs-4 fw-bold"
                  style={{ color: rateColor }}
                >
                  0.000 <span className="text-muted">BNB</span>
                </p>
              </div>

              <div className="mb-4 text-center">
                <h3 className="title mb-3 " style={{ color: textColor }}>
                  User Dividends Available
                </h3>
                <p
                  id="userDivident"
                  className="fs-4 fw-bold"
                  style={{ color: rateColor }}
                >
                  0.000 <span className="text-muted">BNB</span>
                </p>
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Four State Cards */}
          <Col md={6} lg={3}>
            <Card className="shadow-sm p-3 text-center" style={{ ...cardStyle, borderColor: totalDepositColor }}>
              <h4 className="title" style={{ color: totalDepositColor }}>
                Total Deposit
              </h4>
              <p
                id="userDeposits"
                className="fs-4 fw-bold"
                style={{ color: totalDepositColor }}
              >
                0.000
              </p>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="shadow-sm p-3 text-center" style={{ ...cardStyle, borderColor: returnsColor }}>
              <h4 className="title" style={{ color: returnsColor }}>
                Your Returns
              </h4>
              <p
                id="profit"
                className="fs-4 fw-bold"
                style={{ color: returnsColor }}
              >
                0.000
              </p>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="shadow-sm p-3 text-center" style={{ ...cardStyle, borderColor: totalWithdrawnColor }}>
              <h4 className="title" style={{ color: totalWithdrawnColor }}>
                Total Withdrawn
              </h4>
              <p
                id="totalUserTotalWithdrawn"
                className="fs-4 fw-bold"
                style={{ color: totalWithdrawnColor }}
              >
                0.000
              </p>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="shadow-sm p-3 text-center" style={{ ...cardStyle, borderColor: interestRateColor }}>
              <h4 className="title" style={{ color: interestRateColor }}>
                Interest Rate
              </h4>
              <p
                id="interestRate"
                className="fs-4 fw-bold"
                style={{ color: interestRateColor }}
              >
                0.000
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReferralLinkData;
