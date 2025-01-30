import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchContractData } from "../../utils/infuraApi";
import { useAccount } from "wagmi";

type ContractDataType = {
  contractBalance: number;
  totalDeposits: number;
  totalUsers: number;
  withdrawnData: number;
  refRewards: number;
  percentRate: string;
  userAvailable: number;
  userReferralBouns: number;
  userDividends: number;
  userTotalDeposit: number;
  userProfit: number;
  userTotalWithdrawn: number;
  userPercentRate: string;
  userTotalReward: number;
  userTotalReferral: number;
  userDownlineCountArray: number[];
  referralLink: string;
};

type ContractDataContextType = {
  data: ContractDataType;
  loading: boolean;
};

const ContractDataContext = createContext<ContractDataContextType | undefined>(undefined);

export const ContractDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address } = useAccount();
  const [data, setData] = useState<ContractDataType>({
    contractBalance: 0,
    totalDeposits: 0,
    totalUsers: 0,
    withdrawnData: 0,
    refRewards: 0,
    percentRate: "0",
    userAvailable: 0,
    userReferralBouns: 0,
    userDividends: 0,
    userTotalDeposit: 0,
    userProfit: 0,
    userTotalWithdrawn: 0,
    userPercentRate: "0",
    userTotalReward: 0,
    userTotalReferral: 0,
    userDownlineCountArray: [],
    referralLink: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchContractData( address || "");
      setData(fetchedData);
      setLoading(false);
    };
    getData();  
  }, []);

  return (
    <ContractDataContext.Provider value={{ data, loading }}>
      {children}
    </ContractDataContext.Provider>
  );
};

export const useContractData = () => {
  const context = useContext(ContractDataContext);
  if (!context) {
    throw new Error("useContractData must be used within a ContractDataProvider");
  }
  return context;
};
