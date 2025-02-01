import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useContractData } from "../context/ContractDataContext";

import { getCardDataYourIncome } from "../../utils/utils_Component";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import abi from "../../utils/abi.json";

const ReferralLinkData = () => {
  // Fetch contract data
  const { data } = useContractData();
  const { address, isConnected } = useAccount();
  // Get dynamic card data
  const cards = getCardDataYourIncome({
    ...data,
    userPercentRate: data.userPercentRate.toString(),
  });

  const bgColor = import.meta.env.VITE_APP_REFERRAL_LINK_BG_COLOR || "#f8f9fa";
  const textColor = import.meta.env.VITE_APP_REFERRAL_LINK_TEXT_COLOR || "#000000";
  const buttonColor = import.meta.env.VITE_APP_BUTTON_COLOR || "#007bff";
  const lightwhiteColor = import.meta.env.VITE_APP_LIGHT_WHITE_COLOR || "#f8f9fa";
  const buttonWithdrawableWidth = import.meta.env.VITE_APP_WITHDRAWN_BUTTON_WIDTH || "50%";
  const contractAddress = import.meta.env.VITE_APP_INFURA_CONTRACT_ADDRESS;
  const borderColor = import.meta.env.VITE_APP_CARD_BORDER_COLOR || "#dee2e6";
  const boxShadowColor = import.meta.env.VITE_APP_CARD_BOX_SHADOW_COLOR || "rgba(0, 238, 255, 0.78)";

  const cardStyle = {
    backgroundColor: bgColor,
    border: `2px solid ${borderColor}`,
    boxShadow: `0 0.25rem 0.75rem ${boxShadowColor}`,
  };

  const buttonStyle = {
    backgroundColor: buttonColor,
    color: "#fff",
    width: "100%",
  };

  const alertview = {
    width: "100%",
  };

  // Contract interaction hooks
  const {
    writeContract,
    data: hash,
    error: withdrawError
  } = useWriteContract();


  const {

    isSuccess: isTransactionSuccess
  } = useWaitForTransactionReceipt({
    hash
  });
  const handleWithdraw = async () => {
    try {
      if (!isConnected || !address) return;


      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'withdraw',

      });

    } catch (error) {
      console.error('Withdraw error:', error);
    }
  };


  return (
    <Container>
    <Row className="mb-4 justify-content-center">
      {/* Left Section: Income Info (col-6) */}
      <Col md={6}>
        <Card className="p-4 text-center" style={cardStyle}>
          <h2 className="title mb-3 mt-2" style={{ color: textColor }}>
            Your Income
          </h2>
          <p
            id="depositUser"
            className="fs-4 fw-bold"
            style={{ color: lightwhiteColor }}
          >
            {data?.userAvailable || 0.0} <span>BNB</span>
          </p>
          <div className="d-flex justify-content-center">
          <Button 
            id="withdraw-button"
            onClick={handleWithdraw}
            style={{ ...buttonStyle, width: buttonWithdrawableWidth }}
          >
            Withdrawal
          </Button>
          </div>
          {withdrawError && (
            <div className="alert alert-danger mt-3">
              Withdrawal failed! Please try again.
            </div>
          )}
          {isTransactionSuccess && hash && (
            <div className="alert alert-success mt-3" style={{ ...alertview }}>
              Withdraw successful! View on{' '}
              <a
                href={`https://testnet.bscscan.com/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                BscScan
              </a>
            </div>
          )}
        </Card>
      </Col>
  
      {/* Right Section: Referral and Dividends (col-3 each) */}
      <Col md={3}>
        <Card className="p-4 text-center" style={cardStyle}>
          <h3 className="title mb-3" style={{ color: textColor }}>
            Referral Amount Available
          </h3>
          <p
            id="userAvailabereferralbonus"
            className="fs-4 fw-bold"
            style={{ color: lightwhiteColor }}
          >
            {data?.userReferralBouns || 0.0} <span>BNB</span>
          </p>
        </Card>
      </Col>
  
      <Col md={3}>
        <Card className="p-4 text-center" style={cardStyle}>
          <h3 className="title mb-3" style={{ color: textColor }}>
            User Dividends Available
          </h3>
          <p
            id="userDivident"
            className="fs-4 fw-bold"
            style={{ color: lightwhiteColor }}
          >
            {data?.userDividends || 0.0} <span>BNB</span>
          </p>
        </Card>
      </Col>
    </Row>
  
    {/* Dynamic Card Rendering */}
    <Row className="g-4">
      {cards.map((card) => (
        <Col key={card.id} md={6} lg={3}>
          <Card
            className="shadow-sm p-3 text-center"
            style={{ ...cardStyle, borderColor: bgColor }}
          >
            <h4 className="title" style={{ color: card.color }}>
              {card.title}
            </h4>
            <p
              id={card.id}
              className="fs-4 fw-bold"
              style={{ color: card.color }}
            >
              {card.value}
            </p>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  
  );
};

export default ReferralLinkData;
