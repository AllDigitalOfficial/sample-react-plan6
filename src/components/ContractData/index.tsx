
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useContractData } from "../context/ContractDataContext";
import Spinner from 'react-bootstrap/Spinner';
import { getCardDataContractData } from "../../utils/utils_Component";

const ContractData: React.FC = () => {
  const { data, loading } = useContractData();
  // Get card data dynamically
  const cards = getCardDataContractData(data);

  const contractBalanceColor =
    import.meta.env.VITE_APP_CONTRACT_BALANCE_NUMBER_COLOR || "#28a745"; // Default to green
  const cardBgColor = import.meta.env.VITE_APP_CARD_BG_COLOR || "#f8f9fa"; // Default to light gray
  const cardTextColor = import.meta.env.VITE_APP_CARD_TEXT_COLOR || "#000000"; // Default to black
  const cardBorderColor = import.meta.env.VITE_APP_CARD_BORDER_COLOR || "#dee2e6"; // Default to light border color


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="grow" />
      </div>
    );
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
        {cards.map((card) => (
          <Col key={card.id}>
            <div
              className="card p-4 text-center shadow-sm h-100"
              style={{
                backgroundColor: cardBgColor,
                borderColor: cardBorderColor,
              }}
            >
              <h4 style={{ color: cardTextColor }}>{card.title}</h4>
              <p style={{ color: cardTextColor }} className="fs-5 fw-bold">
                {card.value}
              </p>
              {card.unit && <p style={{ color: cardTextColor }}>{card.unit}</p>}
              <i className={card.iconClass}></i>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ContractData;
