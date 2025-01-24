import { Container, Row, Col } from "react-bootstrap";
const ContractData = () => {
  // Get color values from environment variables
  const contractBalanceColor =
    import.meta.env.VITE_APP_CONTRACT_BALANCE_NUMBER_COLOR || "#28a745"; // Default to green
  const cardBgColor = import.meta.env.VITE_APP_CARD_BG_COLOR || "#f8f9fa"; // Default to light gray
  const cardTextColor = import.meta.env.VITE_APP_CARD_TEXT_COLOR || "#000000"; // Default to black
  const cardBorderColor = import.meta.env.VITE_APP_CARD_BORDER_COLOR || "#dee2e6"; // Default to light border color

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div
            className="card p-4 shadow-sm"
            style={{
              backgroundColor: cardBgColor,
              borderColor: cardBorderColor,
            }}
          >
            <h3 className="card-title mb-3 text-center" style={{ color: cardTextColor }}>
              Current Contract Balance
            </h3>
            <span
              id="contract-balance2 "
              className="fs-4 fw-bold text-center"
              style={{ color: contractBalanceColor }}
            >
              0.000 BNB
            </span>
          </div>
        </Col>
      </Row>

      <Row className="gap-2">
        <Col>
          <div
            className="card p-4 text-center shadow-sm h-100"
            style={{
              backgroundColor: cardBgColor,
              borderColor: cardBorderColor,
            }}
          >
            <h4 style={{ color: cardTextColor }}>Deposited</h4>
            <p style={{ color: cardTextColor }} id="total-deposits" className="fs-5 fw-bold">
              0
            </p>
            <p style={{ color: cardTextColor }} >BNB</p>
            <i className="bi bi-wallet2 fs-3 text-primary"></i>
          </div>
        </Col>

        <Col>
          <div
            className="card p-4 text-center shadow-sm h-100"
            style={{
              backgroundColor: cardBgColor,
              borderColor: cardBorderColor,
            }}
          >
            <h4 style={{ color: cardTextColor }}>Users</h4>
            <p style={{ color: cardTextColor }} id="total-users" className="fs-5 fw-bold">
              0
            </p>
            <i className="bi bi-person-circle fs-3 text-primary"></i>
          </div>
        </Col>

        <Col>
          <div
            className="card p-4 text-center shadow-sm h-100"
            style={{
              backgroundColor: cardBgColor,
              borderColor: cardBorderColor,
            }}
          >
            <h4 style={{ color: cardTextColor }}>Withdrawn</h4>
            <p style={{ color: cardTextColor }} id="withdrawandata2" className="fs-5 fw-bold">
              0
            </p>
            <p  style={{ color: cardTextColor }} >BNB</p>
            <i className="bi bi-arrow-down-circle fs-3 text-primary"></i>
          </div>
        </Col>

        <Col>
          <div
            className="card p-4 text-center shadow-sm h-100"
            style={{
              backgroundColor: cardBgColor,
              borderColor: cardBorderColor,
            }}
          >
            <h4 style={{ color: cardTextColor }}>Ref Rewards</h4>
            <p style={{ color: cardTextColor }} id="ref-rewards" className="fs-5 fw-bold">
              0
            </p>
            <p style={{ color: cardTextColor }} >BNB</p>
            <i className="bi bi-gift fs-3 text-primary"></i>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContractData;
