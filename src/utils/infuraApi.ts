import { ethers } from "ethers";
import { INFURA_API_URL, CONTRACT_ADDRESS, ABI } from "./constants";

export const fetchContractData = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const contractBalance = await contract.getContractBalance(); 
    const totalDeposits = await contract.totalInvested(); 
    const totalUsers = await contract.totalUsers();       
    const withdrawnData = await contract.totalWithdrawn(); 
    const refRewards = await contract.totalReferrals();       
    const percentRate = await contract.BASE_PERCENT();

    return {
      contractBalance: ethers.formatEther(contractBalance),
      totalDeposits: ethers.formatEther(totalDeposits),
      totalUsers: totalUsers.toString(),
      withdrawnData: ethers.formatEther(withdrawnData),
      refRewards: ethers.formatEther(refRewards),
        percentRate: percentRate.toString(),
    };
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error;
  }
};
