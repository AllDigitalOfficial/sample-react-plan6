import { Container, Row, Col, Card } from "react-bootstrap";
import { useContractData } from "../context/ContractDataContext";


const Levels = () => {
  const { data } = useContractData();
  // Get environment variable values
  const sectionBgColor =
    import.meta.env.VITE_APP_LEVELS_SECTION_BG_COLOR || "#f8f9fa";
  const titleColor = import.meta.env.VITE_APP_LEVELS_TITLE_COLOR || "#000000";
  const cardBgColor = import.meta.env.VITE_APP_LEVEL_CARD_BG_COLOR || "#ffffff";
  const cardTextColor =
    import.meta.env.VITE_APP_LEVEL_CARD_TEXT_COLOR || "#000000";
  const percentageColor =
    import.meta.env.VITE_APP_LEVEL_PERCENTAGE_COLOR || "#007bff";
  const totalLevels = import.meta.env.VITE_APP_TOTAL_LEVEL_LENGTH || 15;
  const levels = data?.userDownlineCountArray || [];
  const borderColor = import.meta.env.VITE_APP_CARD_BORDER_COLOR || "#dee2e6";
  const boxShadowColor = import.meta.env.VITE_APP_CARD_BOX_SHADOW_COLOR || "rgba(0, 238, 255, 0.78)";
 

  console.log("shadow color",import.meta.env.VITE_APP_CARD_BOX_SHADOW_COLOR);
  

  return (
    <section
      className="user-details-wrapper py-5"
      style={{ backgroundColor: sectionBgColor,


       }}
    >
      <Container >
        <h2 className="mb-4 text-center" style={{ color: titleColor }}>
          Levels
        </h2>
      
        <Row >
          {Array.from({ length: totalLevels }, (_, index) => {
            const level = index + 1;
            const percentage = import.meta.env[`VITE_APP_LEVEL_${level}_PERCENTAGE`] || "1";

            return (
              <Col key={level} md={4} lg={3} className="mb-4">
                <Card
                  className=""
                  style={{
                    backgroundColor: cardBgColor,
                    color: cardTextColor,
                    border: `2px solid ${borderColor}`,
                        boxShadow: `0 0.25rem 0.75rem ${boxShadowColor}`,
                  
                  }}
                >
                  <Card.Body className="p-4 ">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span>Level {level}</span>
                      <em style={{ color: percentageColor }}>{percentage}%</em>
                    </div>
                    <h3 id={`level-${level}`} className="text-center">
                      {levels[level - 1] || 0}
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
