import { useState, useEffect } from "react";
import { fetchContractData } from "../utils/infuraApi";
import { useAccount } from "wagmi";

export const useFetchContractData = () => {
  const { address } = useAccount();
  const [data, setData] = useState({
    contractBalance: "0",
    totalDeposits: "0",
    totalUsers: "0",
    withdrawnData: "0",
    refRewards: "0",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchContractData(address || "");
       
        setData(result);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
