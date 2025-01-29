import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useContractData } from "../context/ContractDataContext";
import Spinner from 'react-bootstrap/Spinner';
import { getCardDataYourIncome } from "../../utils/utils_Component";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import abi from "../../utils/abi.json";

const ReferralLinkData = () => {
  // Fetch contract data
  const { data, loading } = useContractData();
  const { address, isConnected } = useAccount();
  // Get dynamic card data
  const cards = getCardDataYourIncome(data);

  const bgColor = import.meta.env.VITE_APP_REFERRAL_LINK_BG_COLOR || "#f8f9fa";
  const textColor = import.meta.env.VITE_APP_REFERRAL_LINK_TEXT_COLOR || "#000000";
  const buttonColor = import.meta.env.VITE_APP_BUTTON_COLOR || "#007bff";
  const lightwhiteColor = import.meta.env.VITE_APP_LIGHT_WHITE_COLOR || "#f8f9fa";
  const buttonWithdrawableWidth = import.meta.env.VITE_APP_WITHDRAWN_BUTTON_WIDTH || "50%";
  const contractAddress = import.meta.env.VITE_APP_INFURA_CONTRACT_ADDRESS;

  const cardStyle = {
    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
    backgroundColor: bgColor,
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



  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="grow" />
      </div>
    );
  }



  return (
    <Container>
      <Row className="mb-4 justify-content-center">
        {/* Left Section: Income and Referral Info */}
        <Col lg={12}>
          <Card className="shadow-sm p-4" style={cardStyle}>
            <div className="mb-4 text-center">
              <h2 className="title mb-3" style={{ color: textColor }}>
                Your Income
              </h2>
              <p
                id="depositUser"
                className="fs-4 fw-bold"
                style={{ color: lightwhiteColor }}
              >
                {data?.userAvailable || 0.0} <span>BNB</span>
              </p>
              <Button id="withdraw-button"
                onClick={handleWithdraw}
                style={{ ...buttonStyle, width: buttonWithdrawableWidth }}>
                Withdrawal
              </Button>
              {withdrawError && (
                <div className="alert alert-danger">
                  {withdrawError.message}
                </div>
              )}

              {isTransactionSuccess && hash && (
                <div
                  className="alert mt-4 mx-auto alert-success "
                  style={{...alertview}}>
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

            </div>

            <div className="mb-4 text-center">
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
            </div>

            <div className="mb-4 text-center">
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
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Dynamic Card Rendering */}
        {cards.map((card) => (
          <Col key={card.id} md={6} lg={3}>
            <Card className="shadow-sm p-3 text-center" style={{ ...cardStyle, borderColor: bgColor }}>
              <h4 className="title" style={{ color: card.color }}>
                {card.title}
              </h4>
              <p id={card.id} className="fs-4 fw-bold" style={{ color: card.color }}>
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
