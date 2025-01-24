import { Container, Row, Col, Card } from "react-bootstrap";

const Levels = () => {
  // Get environment variable values
  const sectionBgColor =
    import.meta.env.VITE_APP_LEVELS_SECTION_BG_COLOR || "#f8f9fa";
  const titleColor = import.meta.env.VITE_APP_LEVELS_TITLE_COLOR || "#000000";
  const cardBgColor = import.meta.env.VITE_APP_LEVEL_CARD_BG_COLOR || "#ffffff";
  const cardTextColor =
    import.meta.env.VITE_APP_LEVEL_CARD_TEXT_COLOR || "#000000";
  const percentageColor =
    import.meta.env.VITE_APP_LEVEL_PERCENTAGE_COLOR || "#007bff";

  return (
    <section
      className="user-details-wrapper py-5"
      style={{ backgroundColor: sectionBgColor }}
    >
      <Container>
        <h2 className="mb-4 text-center" style={{ color: titleColor }}>
          Levels
        </h2>
        <Row>
          {Array.from({ length: 15 }, (_, index) => {
            const level = index + 1;
            const percentage = level === 1 ? "5%" : level === 2 ? "4%" : "1%";

            return (
              <Col key={level} md={4} lg={3} className="mb-4">
                <Card
                  className="shadow-sm p-3"
                  style={{
                    backgroundColor: cardBgColor,
                    color: cardTextColor,
                  }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span>Level {level}</span>
                      <em style={{ color: percentageColor }}>{percentage}</em>
                    </div>
                    <h3 id={`level-${level}`} className="text-center">
                      0
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Levels;
