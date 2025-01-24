import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Deposit = () => {
  // Environment variable values
  const depositBgColor = import.meta.env.VITE_APP_DEPOSIT_BG_COLOR || "#f8f9fa";
  const depositTextColor =
    import.meta.env.VITE_APP_DEPOSIT_TEXT_COLOR || "#000000";
  const buttonColor = import.meta.env.VITE_APP_BUTTON_COLOR || "#007bff";
  const minDeposit = import.meta.env.VITE_APP_MIN_DEPOSIT || 0.05;
  const maxDeposit = import.meta.env.VITE_APP_MAX_DEPOSIT || 1000;
  const perDayIncome = import.meta.env.VITE_APP_DEPOSIT_INCOME || 0.0;
  const percentRate = import.meta.env.VITE_APP_PERCENT_RATE || 0;
  const totalIncome = import.meta.env.VITE_APP_TOTAL_INCOME || 0.0;

  // Reusable styles
  const buttonStyle = {
    backgroundColor: buttonColor,
    color: "#fff",
    width: "100%",
  };

  const cardStyle = {
    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
  };

  return (
    <div
      id="deposit"
      className="py-5"
      style={{ backgroundColor: depositBgColor }}
    >
      <Container>
        <Row>
          {/* Deposit Form Section */}
          <Col lg={6} md={12} className="mb-4 mb-lg-0">
            <div>
              <h2 style={{ color: depositTextColor }} className="mb-4">
                Deposit
              </h2>
              <h4>Make New</h4>
              <Form>
                <Form.Group className="mb-3">
                  <div className="input-group">
                    <Form.Control
                      id="depositAmount"
                      type="number"
                      placeholder="0.000"
                      style={{ height: "50px" }}
                    />
                    <span
                      className="input-group-text"
                      style={{ height: "50px" }}
                    >
                      BNB
                    </span>
                  </div>
                </Form.Group>
                <Button
                  id="sendTransaction"
                  style={buttonStyle}
                  className="mb-3"
                >
                  MAKE DEPOSIT
                </Button>
                <div className="text-muted">
                  <p>Minimum {minDeposit} BNB</p>
                  <p>Maximum {maxDeposit} BNB</p>
                </div>
              </Form>
            </div>
          </Col>

          {/* Summary Cards Section */}
          <Col lg={6} md={12}>
            <Col className="mb-4">
              <Col>
                <Card style={cardStyle} className="text-center">
                  <Card.Body>
                    <h4>Per Day</h4>
                    <p id="perDayIncome" className="fs-4 fw-bold">
                      {perDayIncome} BNB
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={cardStyle} className="text-center">
                  <Card.Body>
                    <h4>Percent Rate</h4>
                    <p className="fs-4">
                      <span id="base-percentage">{percentRate}%</span>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={cardStyle} className="text-center">
                  <Card.Body>
                    <h4>Total Income</h4>
                    <p id="totalIncome" className="fs-4 fw-bold">
                      {totalIncome} BNB
                    </p>
                    <small className="text-muted">
                      * Withdrawal at any time you want!
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Deposit;
