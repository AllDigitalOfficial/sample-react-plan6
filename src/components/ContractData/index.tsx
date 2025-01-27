
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useContractData } from "../context/ContractDataContext";

const ContractData: React.FC = () => {
  const { data, loading } = useContractData();

  // Define color values from environment variables
  const contractBalanceColor =
    import.meta.env.VITE_APP_CONTRACT_BALANCE_NUMBER_COLOR || "#28a745"; // Default to green
  const cardBgColor = import.meta.env.VITE_APP_CARD_BG_COLOR || "#f8f9fa"; // Default to light gray
  const cardTextColor = import.meta.env.VITE_APP_CARD_TEXT_COLOR || "#000000"; // Default to black
  const cardBorderColor = import.meta.env.VITE_APP_CARD_BORDER_COLOR || "#dee2e6"; // Default to light border color

  // Loading state or data display
  if (loading) {
    return <div>Loading...</div>;
  }

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
              id="contract-balance2"
              className="fs-4 fw-bold text-center"
              style={{ color: contractBalanceColor }}
            >
              {data?.contractBalance || "0.000"} BNB
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
            <p style={{ color: cardTextColor }} className="fs-5 fw-bold">
              {data?.totalDeposits || 0}
            </p>
            <p style={{ color: cardTextColor }}>BNB</p>
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
            <p style={{ color: cardTextColor }} className="fs-5 fw-bold">
              {data?.totalUsers || 0}
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
            <p style={{ color: cardTextColor }} className="fs-5 fw-bold">
              {data?.withdrawnData || 0}
            </p>
            <p style={{ color: cardTextColor }}>BNB</p>
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
            <p style={{ color: cardTextColor }} className="fs-5 fw-bold">
              {data?.refRewards || 0}
            </p>
            <p style={{ color: cardTextColor }}>BNB</p>
            <i className="bi bi-gift fs-3 text-primary"></i>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContractData;
