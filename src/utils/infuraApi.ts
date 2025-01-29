import { ethers } from "ethers";
import { INFURA_API_URL, CONTRACT_ADDRESS, ABI } from "./constants";


interface ContractData {
  contractBalance: string;
  totalDeposits: string;
  totalUsers: string;
  withdrawnData: string;
  refRewards: string;
  percentRate: string;
  userAvailable: string;
  userReferralBouns: string;
  userDividends: string;
  userTotalDeposit: string;
  userProfit: string;
  userTotalWithdrawn: string;
  userPercentRate: string;
  userTotalReward: string;
  userTotalReferral: string;
  userDownlineCountArray: number[];
  referralLink: string;
}

export const fetchContractData = async (address: string): Promise<ContractData> => {
  if (!address) throw new Error("Wallet address is required");

  try {
    const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    const walletAddress = import.meta.env.VITE_APP_WALLET_ADDRESS as string;
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
    const generateReferralLink = (address: string): string => `https://bnbclub.pro?ref=${address}`;
    const isOwner = address.toLowerCase() === ownerAddress.toLowerCase();
    const hasDeposits = Number(userTotalDeposit) > 0;
    let referralLinkElement = "You will get your ref link after investing";

    if (isOwner || hasDeposits) {
      referralLinkElement = generateReferralLink(address);
    }

    return {
      contractBalance: ethers.formatEther(contractBalance),
      totalDeposits: ethers.formatEther(totalDeposits),
      totalUsers: totalUsers.toString(),
      withdrawnData: ethers.formatEther(withdrawnData),
      refRewards: ethers.formatEther(refRewards),
      percentRate: percentRate.toString(),
      userAvailable: ethers.formatEther(userAvailable),
      userReferralBouns: ethers.formatEther(userReferralBouns),
      userDividends: ethers.formatEther(userDividends),
      userTotalDeposit: ethers.formatEther(userTotalDeposit),
      userProfit: userProfit,
      userTotalWithdrawn: ethers.formatEther(userTotalWithdrawn),
      userPercentRate: userPercentRate.toString(),
      userTotalReward: ethers.formatEther(userTotalReward),
      userTotalReferral: userTotalReferral.toString(),
      userDownlineCountArray: userDownlineCountArray.map((count: bigint) => Number(count)),
      referralLink: referralLinkElement,
    };
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error;
  }
};
