
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useContractData } from "../context/ContractDataContext";

import { getCardDataContractData } from "../../utils/utils_Component";

const ContractData: React.FC = () => {
  const { data } = useContractData();
  // Get card data dynamically
  const cards = getCardDataContractData(data);

  const contractBalanceColor =
    import.meta.env.VITE_APP_CONTRACT_BALANCE_NUMBER_COLOR || "#28a745"; // Default to green
  const cardBgColor = import.meta.env.VITE_APP_CARD_BG_COLOR || "#f8f9fa"; // Default to light gray
  const cardTextColor = import.meta.env.VITE_APP_CARD_TEXT_COLOR || "#000000"; // Default to black
  const cardBorderColor = import.meta.env.VITE_APP_CARD_BORDER_COLOR || "#dee2e6"; // Default to light border color
  const boarderBoxShadow = import.meta.env.VITE_APP_CARD_BOX_SHADOW_COLOR || "0 0.25rem 0.75rem rgba(13, 236, 236, 0.6)"; // Default to light border shadow
 const borderColor = import.meta.env.VITE_APP_CARD_BORDER_COLOR || "#dee2e6"; // Default to light border color


 
  return (
    <div className="col-12 mb-4">
    <Container>
      <Row className="mb-4">
        <Col>
          <div
            className="card mt-4 p-4 "
            style={{
              boxShadow:`0 0.25rem 0.75rem ${boarderBoxShadow}`,
              backgroundColor: cardBgColor,
              border: `2px solid ${borderColor}`,
            }}
          >
            <h3 className="card-title mb-3 text-center" style={{ color: cardTextColor, border:cardBgColor }}>
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
    </div>
  );
};

export default ContractData;
