import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchContractData } from "../../utils/infuraApi";

type ContractDataType = {
  contractBalance: string;
  totalDeposits: string;
  totalUsers: string;
  withdrawnData: string;
  refRewards: string;
  percentRate: string;
};

type ContractDataContextType = {
  data: ContractDataType;
  loading: boolean;
};

const ContractDataContext = createContext<ContractDataContextType | undefined>(undefined);

export const ContractDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ContractDataType>({
    contractBalance: "0",
    totalDeposits: "0",
    totalUsers: "0",
    withdrawnData: "0",
    refRewards: "0",
    percentRate: "0",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchContractData();
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
