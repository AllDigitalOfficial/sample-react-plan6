export const getCardDataYourIncome = (data: any) => {
    return [
      {
        id: "userDeposits",
        title: "Total Deposit",
        value: data?.userTotalDeposit || 0.0,
        color: import.meta.env.VITE_APP_TOTAL_DEPOSIT_COLOR || "#28a745",
      },
      {
        id: "profit",
        title: "Your Returns",
        value: data?.userProfit || 0.0,
        color: import.meta.env.VITE_APP_RETURNS_COLOR || "#ffc107",
      },
      {
        id: "totalUserTotalWithdrawn",
        title: "Total Withdrawn",
        value: data?.userTotalWithdrawn || 0.0,
        color: import.meta.env.VITE_APP_TOTAL_WITHDRAWN_COLOR || "#dc3545",
      },
      {
        id: "interestRate",
        title: "Interest Rate",
        value: `${(parseInt(data?.userPercentRate) / 10).toFixed(2) || "0.00"}% Per Day`,
        color: import.meta.env.VITE_APP_INTEREST_RATE_COLOR || "#17a2b8",
      },
    ];
  };
  

  export const getCardDataContractData = (data: any) => [
    {
      id: "deposited",
      title: "Deposited",
      value: data?.totalDeposits || 0,
      unit: "BNB",
      iconClass: "bi bi-wallet2 fs-3 text-primary",
    },
    {
      id: "users",
      title: "Users",
      value: data?.totalUsers || 0,
      unit: "",
      iconClass: "bi bi-person-circle fs-3 text-primary",
    },
    {
      id: "withdrawn",
      title: "Withdrawn",
      value: data?.withdrawnData || 0,
      unit: "BNB",
      iconClass: "bi bi-arrow-down-circle fs-3 text-primary",
    },
    {
      id: "refRewards",
      title: "Ref Rewards",
      value: data?.refRewards || 0,
      unit: "BNB",
      iconClass: "bi bi-gift fs-3 text-primary",
    },
  ];
  