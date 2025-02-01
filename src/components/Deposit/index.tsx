import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useContractData } from "../context/ContractDataContext";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

import abi from "../../utils/abi.json";

const Deposit = () => {
  const { data } = useContractData();
  const { address, isConnected } = useAccount();

  // Environment variables
 
  const depositTextColor = import.meta.env.VITE_APP_DEPOSIT_TEXT_COLOR || "#000000";
  const buttonColor = import.meta.env.VITE_APP_BUTTON_COLOR || "#007bff";
  const textRestrictColor = import.meta.env.VITE_APP_TEXT_RESTRICTED_COLOR || "#000000";
  const depositCardBgColor = import.meta.env.VITE_APP_DEPOSIT_CARD_BG_COLOR || "#f8f9fa";
  const textRed = import.meta.env.VITE_APP_TEXT_RED_COLOR || "#ff0000";
  const depositCardTextColor = import.meta.env.VITE_APP_DEPOSIT_CARD_TEXT_COLOR || "#000000";
  const minDeposit = import.meta.env.VITE_APP_MIN_DEPOSIT || 0.05;
  const maxDeposit = import.meta.env.VITE_APP_MAX_DEPOSIT || 1000;
  const basicInterestRate = import.meta.env.VITE_APP_BASIC_INTEREST_RATE || 1.5;
  const contractAddress = import.meta.env.VITE_APP_INFURA_CONTRACT_ADDRESS;
  const borderColor = import.meta.env.VITE_APP_DEPOSIT_CARD_BORDER_COLOR || "#dee2e6";
  const borderColorYellow = import.meta.env.VITE_APP_DEPOSIT_CARD_BORDER_COLOR_YELLOW || "#FFFF00";

  const [amount, setAmount] = useState<string>("");
  const dailyRoi = basicInterestRate / 100;

  // Contract interaction hooks
  const {
    writeContract,
    data: hash,
    isPending,
    error: investError
  } = useWriteContract();

  const {
    isLoading: isWaitingForTransaction,
    isSuccess: isTransactionSuccess
  } = useWaitForTransactionReceipt({
    hash
  });

  // Get referrer from URL if present
  const getReferrer = () => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    return (ref && ref.length === 42 && ref.startsWith('0x')) ? ref : import.meta.env.VITE_APP_DEFAULT_REFERRER;
  };

  const handleInvestment = async () => {
    try {
      if (!isConnected || !address || !amount) return;

      const amountNum = parseFloat(amount);
      if (amountNum < minDeposit || amountNum > maxDeposit) {
        throw new Error(`Investment must be between ${minDeposit} and ${maxDeposit} BNB`);
      }

      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'invest',
        args: [getReferrer() ],
        value: parseEther(amount)
      });
 
    } catch (error) {
      console.error('Investment error:', error);
    }
  };
  // Show an alert when the transaction is successful
  useEffect(() => {
    if (hash) {
    
      alert("Investment Complete!");

    }
  }, [hash]);
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value);
  };

  const calculateReturns = (amount: string) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return { perDay: "0.000 BNB", total: "0.000 BNB" };

    const perDayIncome = numAmount * dailyRoi;
    const totalIncome = numAmount * 2; // Assuming 200% total return

    return {
      perDay: `${perDayIncome.toFixed(3)} BNB`,
      total: `${totalIncome.toFixed(3)} BNB`
    };
  };

  const returns = calculateReturns(amount);

  const buttonStyle = {
    backgroundColor: buttonColor,
    color: "#fff",
    width: "100%",
    
  };

  const cardStyle = {
    boxShadow: "0 0.25rem 0.75rem rgba(6, 216, 239, 0.67)",
    backgroundColor: depositCardBgColor,
    border: `1px solid ${borderColor}`,
    
  };


  return (
    <div id="deposit" className="py-5" >
      <Container>
        <Row>
          <Col lg={6} md={12} className="mb-4 mb-lg-0">
            <h3 style={{ color: depositTextColor }}>Make New Deposit</h3>
            <Form>
              <Form.Group className="mb-3">
                <div className="input-group">
                  <Form.Control 
                    id="depositAmount"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder={`${minDeposit} BNB`}
                    style={{ height: "50px", borderColor:`4px solid ${borderColorYellow}` }}
                    min={minDeposit}
                    max={maxDeposit}
                  />
                  <span className="input-group-text" style={{ height: "50px",  }}>
                    BNB
                  </span>
                </div>
              </Form.Group>
             
              <div  style={{ width: '50%' }}>
              <Button
                id="sendTransaction"
                style={buttonStyle}
                className="mb-3"
                onClick={handleInvestment}
                disabled={!isConnected || isPending || isWaitingForTransaction || !amount}
              >
                Make Deposit
              </Button>
              </div>
              

              {investError && (
                <div className="alert alert-danger">
                  Investment Failed 
                </div>
              )}
  
              {isTransactionSuccess && hash && (
                <div className="alert alert-success">
                  Investment successful! View on{' '}
                  <a
                    href={`https://testnet.bscscan.com/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BscScan
                  </a>
                </div>
              )}

              <div className="text-muted d-flex gap-4">
                <p style={{ color: textRed }}>Minimum {minDeposit} BNB</p>
                <p style={{ color: textRed }}>Maximum {maxDeposit} BNB</p>
              </div>
            </Form>
          </Col>

          <Col lg={6} md={12}>
            <CardGroup
              cardStyle={cardStyle}
              depositCardTextColor={depositCardTextColor}
              textRestrictColor={textRestrictColor}
              perDayIncome={returns.perDay}
              percentRate={(parseFloat(data?.percentRate?.toString() || "0")) / 10}
              totalIncome={returns.total}
              borderColor={borderColor}
              data={{ percentRate: data?.percentRate?.toString() || "0" }}
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
}: {
  cardStyle: React.CSSProperties;
  depositCardTextColor: string;
  textRestrictColor: string;
  perDayIncome: string;
  percentRate: number;
  totalIncome: string;
  borderColor: string;
  data: {
    percentRate: string;
  } | null;
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
      value={`${percentRate}%`}
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