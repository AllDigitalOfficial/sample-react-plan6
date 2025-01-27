import { ethers } from "ethers";
import { INFURA_API_URL, CONTRACT_ADDRESS, ABI } from "./constants";

export const fetchContractData = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    const walletAddress = "0x98B137209686a67f030E123e1E1d828eDA78087A";
    const ownerAddress = "0x98B137209686a67f030E123e1E1d828eDA780872";
    const contractBalance = await contract.getContractBalance(); 
    const totalDeposits = await contract.totalInvested(); 
    const totalUsers = await contract.totalUsers();       
    const withdrawnData = await contract.totalWithdrawn(); 
    const refRewards = await contract.totalReferrals();       
    const percentRate = await contract.BASE_PERCENT();
    const userAvailable = await contract.getUserAvailable(walletAddress);
    const userReferralBouns = await contract.getUserReferralBonus(walletAddress);
    const userDividends = await contract.getUserDividends(walletAddress);
    const userTotalDeposit = await contract.getUserTotalDeposits(walletAddress);
    const userTotalWithdrawn = await contract.getUserTotalWithdrawn(walletAddress);
    const userPercentRate = await contract.getUserPercentRate(walletAddress);
    const userTotalReward = await contract.getUserReferralTotalBonus(walletAddress);
    const userDownlineCountArray = await contract.getUserDownlineCount(walletAddress);
    const userTotalReferral = userDownlineCountArray.reduce((acc: number, count: bigint) => acc + Number(count), 0);

    const calculatePercentage = (value: string, total: string): string => {
        // If total is zero or invalid, return "0" to avoid division by zero
        const numericTotal = Number(total);
        const numericValue = Number(value);
      
        if (numericTotal <= 0) {
          return "0";
        }
      
        const percentage = (numericValue / numericTotal) * 100;
        return percentage.toFixed(2); // Returns percentage with 2 decimal points
      };
    const userProfit = calculatePercentage(userTotalWithdrawn, userTotalDeposit);
    const generateReferralLink = (walletAddress: string): string => `https://bnbclub.pro?ref=${walletAddress}`;
    const isOwner = walletAddress.toLowerCase() === ownerAddress.toLowerCase();
    console.log("isOwner",isOwner);
    const hasDeposits = Number(userTotalDeposit) > 0;
    console.log("hasDeposits",hasDeposits);
    let referralLinkElement = "You will get your ref link after investing";

    if (isOwner || hasDeposits) {
        referralLinkElement = generateReferralLink(walletAddress);
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
