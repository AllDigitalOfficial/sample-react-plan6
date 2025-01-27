import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useContractData } from "../context/ContractDataContext";

const Deposit = () => {
  const { data, loading } = useContractData();

  // Environment variable values
  const depositBgColor = import.meta.env.VITE_APP_DEPOSIT_BG_COLOR || "#f8f9fa";
  const depositTextColor = import.meta.env.VITE_APP_DEPOSIT_TEXT_COLOR || "#000000";
  const buttonColor = import.meta.env.VITE_APP_BUTTON_COLOR || "#007bff";
  const textRestrictColor = import.meta.env.VITE_APP_TEXT_RESTRICTED_COLOR || "#000000";
  const depositCardBgColor = import.meta.env.VITE_APP_DEPOSIT_CARD_BG_COLOR || "#f8f9fa";
  const textRed = import.meta.env.VITE_APP_TEXT_RED_COLOR || "#ff0000";
  const depositCardTextColor = import.meta.env.VITE_APP_DEPOSIT_CARD_TEXT_COLOR || "#000000";
  const minDeposit = import.meta.env.VITE_APP_MIN_DEPOSIT || 0.05;
  const maxDeposit = import.meta.env.VITE_APP_MAX_DEPOSIT || 1000;
  const perDayIncome = import.meta.env.VITE_APP_DEPOSIT_INCOME || 0.0;
  const percentRate = import.meta.env.VITE_APP_PERCENT_RATE || 0;
  const totalIncome = import.meta.env.VITE_APP_TOTAL_INCOME || 0.0;
  const basicInterestRate = import.meta.env.VITE_APP_BASIC_INTEREST_RATE || 1.5;
  const dailyRoi = basicInterestRate / 100;

  const [amount, setAmount] = useState<number>();
  const [perDayIncomeDisplay, setPerDayIncomeDisplay] = useState<string>(`${perDayIncome} BNB`);
  const [totalIncomeDisplay, setTotalIncomeDisplay] = useState<string>(`${totalIncome} BNB`);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value);
    setAmount(newAmount);

    if (!isNaN(newAmount)) {
      const newPerDayIncome = newAmount * dailyRoi;
      const newTotalIncome = newAmount * 2; // Assuming total income is double the investment

      setPerDayIncomeDisplay(`${newPerDayIncome.toFixed(3)} BNB`);
      setTotalIncomeDisplay(`${newTotalIncome.toFixed(3)} BNB`);
    }
  };

  const buttonStyle = {
    backgroundColor: buttonColor,
    color: "#fff",
    width: "100%",
  };

  const cardStyle = {
    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
    backgroundColor: depositCardBgColor,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="deposit" className="py-5" style={{ backgroundColor: depositBgColor }}>
      <Container>
        <Row>
          {/* Deposit Form Section */}
          <Col lg={6} md={12} className="mb-4 mb-lg-0">
            <h2 style={{ color: depositTextColor }} className="mb-4">
              Deposit
            </h2>
            <h4 style={{ color: depositTextColor }}>Make New</h4>
            <Form>
              <Form.Group className="mb-3">
                <div className="input-group">
                  <Form.Control
                  id="depositAmount"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder={`${minDeposit} BNB`}
                  style={{ height: "50px" }}
                  />
                  <span className="input-group-text" style={{ height: "50px" }}>
                  BNB
                  </span>
                </div>
              </Form.Group>
              <Button id="sendTransaction" style={buttonStyle} className="mb-3">
                MAKE DEPOSIT
              </Button>
              <div className="text-muted d-flex gap-4">
                <p style={{ color: textRed }}>Minimum {minDeposit} BNB</p>
                <p style={{ color: textRed }}>Maximum {maxDeposit} BNB</p>
              </div>
            </Form>
          </Col>

          {/* Summary Cards Section */}
          <Col lg={6} md={12}>
            <CardGroup
              cardStyle={cardStyle}
              depositCardTextColor={depositCardTextColor}
              textRestrictColor={textRestrictColor}
              perDayIncome={perDayIncomeDisplay}
              percentRate={percentRate}
              totalIncome={totalIncomeDisplay}
              data={data}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const CardGroup = ({
  cardStyle,
  depositCardTextColor,
  textRestrictColor,
  perDayIncome,
  percentRate,
  totalIncome,
  data,
}: {
  cardStyle: React.CSSProperties;
  depositCardTextColor: string;
  textRestrictColor: string;
  perDayIncome: string;
  percentRate: number;
  totalIncome: string;
  data: any;
}) => (
  <>
    <CardSection
      title="Per Day"
      value={perDayIncome}
      cardStyle={cardStyle}
      textRestrictColor={textRestrictColor}
      depositCardTextColor={depositCardTextColor}
    />
    <CardSection
      title="Percent Rate"
      value={`${parseInt(data?.percentRate || "0") / 10}%`}
      cardStyle={cardStyle}
      textRestrictColor={textRestrictColor}
      depositCardTextColor={depositCardTextColor}
    />
    <CardSection
      title="Total Income"
      value={totalIncome}
      cardStyle={cardStyle}
      textRestrictColor={textRestrictColor}
      depositCardTextColor={depositCardTextColor}
      smallText="* Withdrawal at any time you want!"
    />
  </>
);

const CardSection = ({
  title,
  value,
  cardStyle,
  textRestrictColor,
  depositCardTextColor,
  smallText,
}: {
  title: string;
  value: string;
  cardStyle: React.CSSProperties;
  textRestrictColor: string;
  depositCardTextColor: string;
  smallText?: string;
}) => (
  <Col className="mb-4">
    <Card style={cardStyle} className="text-center">
      <Card.Body>
        <h4 style={{ color: depositCardTextColor }}>{title}</h4>
        <p style={{ color: textRestrictColor }} className="fs-4 fw-bold">
          {value}
        </p>
        {smallText && (
          <small style={{ color: textRestrictColor }}>{smallText}</small>
        )}
      </Card.Body>
    </Card>
  </Col>
);

export default Deposit;
