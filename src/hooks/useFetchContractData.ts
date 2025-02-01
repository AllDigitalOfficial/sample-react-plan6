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
       
        setData({
          contractBalance: result.contractBalance.toString(),
          totalDeposits: result.totalDeposits.toString(),
          totalUsers: result.totalUsers.toString(),
          withdrawnData: result.withdrawnData.toString(),
          refRewards: result.refRewards.toString(),
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address]);

  return { data, loading, error };
};
