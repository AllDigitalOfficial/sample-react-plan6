import { ethers } from "ethers";
import { INFURA_API_URL, CONTRACT_ADDRESS, ABI } from "./constants";
const referralLink = import.meta.env.VITE_APP_REFFERAL_LINK_DOMAIN || "You will get your ref link after investing"; // Default referral link


interface ContractData {
  contractBalance: number;
  totalDeposits: number;
  totalUsers: number;
  withdrawnData: number;
  refRewards: number;
  percentRate: number;
  userAvailable: number;
  userReferralBouns: number;
  userDividends: number;
  userTotalDeposit: number;
  userProfit: number;
  userTotalWithdrawn: number;
  userPercentRate: number;
  userTotalReward: number;
  userTotalReferral: number;
  userDownlineCountArray: number[];
  referralLink: string;
}

export const fetchContractData = async (address: string): Promise<ContractData> => {
  if (!address) throw new Error("Wallet address is required");

  try {
    const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const ownerAddress = import.meta.env.VITE_APP_OWNER_ADDRESS as string;
    const contractBalance = await contract.getContractBalance();
    const totalDeposits = await contract.totalInvested();
    const totalUsers = await contract.totalUsers();
    const withdrawnData = await contract.totalWithdrawn();
    const refRewards = await contract.totalReferrals();
    const percentRate = await contract.BASE_PERCENT();
    const userAvailable = await contract.getUserAvailable(address);
    const userReferralBouns = await contract.getUserReferralBonus(address);
    const userDividends = await contract.getUserDividends(address);
    const userTotalDeposit = await contract.getUserTotalDeposits(address);
    const userTotalWithdrawn = await contract.getUserTotalWithdrawn(address);
    const userPercentRate = await contract.getUserPercentRate(address);
    const userTotalReward = await contract.getUserReferralTotalBonus(address);
    const userDownlineCountArray = await contract.getUserDownlineCount(address);
    const userTotalReferral = userDownlineCountArray.reduce((acc: number, count: bigint) => acc + Number(count), 0);

    const calculatePercentage = (value: string, total: string): string => {
      const numericTotal = Number(total);
      const numericValue = Number(value);

      if (numericTotal <= 0) {
        return "0";
      }

      const percentage = (numericValue / numericTotal) * 100;
      return percentage.toFixed(2);
    };

    const userProfit = calculatePercentage(userTotalWithdrawn, userTotalDeposit);
    const generateReferralLink = (address: string): string => `${referralLink}${address}`;
    const isOwner = address.toLowerCase() === ownerAddress.toLowerCase();
    const hasDeposits = Number(userTotalDeposit) > 0;
    let referralLinkElement = "You will get your ref link after investing";

    if (isOwner || hasDeposits) {
      referralLinkElement = generateReferralLink(address);
    }

    return {
      contractBalance: Number(ethers.formatEther(contractBalance)),
      totalDeposits: Number(ethers.formatEther(totalDeposits)),
      totalUsers: Number(totalUsers),
      withdrawnData: Number(ethers.formatEther(withdrawnData)),
      refRewards: Number(ethers.formatEther(refRewards)),
      percentRate: Number(percentRate),
      userAvailable: Number(ethers.formatEther(userAvailable)),
      userReferralBouns: Number(ethers.formatEther(userReferralBouns)),
      userDividends: Number(ethers.formatEther(userDividends)),
      userTotalDeposit: Number(ethers.formatEther(userTotalDeposit)),
      userProfit: Number(userProfit),
      userTotalWithdrawn: Number(ethers.formatEther(userTotalWithdrawn)),
      userPercentRate: Number(userPercentRate),
      userTotalReward: Number(ethers.formatEther(userTotalReward)),
      userTotalReferral: userTotalReferral,
      userDownlineCountArray: userDownlineCountArray.map((count: bigint) => Number(count)),
      referralLink: referralLinkElement,
    };
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error;
  }
};
