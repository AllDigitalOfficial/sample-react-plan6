import React, { ReactNode } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiConfig, createConfig } from 'wagmi';
import { arbitrum, mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Types
interface Web3ModalProviderProps {
  children: ReactNode;
}

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = '9f5afcba328b2c1a96014fbd8d71f6ec';

// 2. Configure metadata
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // Must match your domain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// 3. Configure chains
const chains = [mainnet, arbitrum];

// 4. Create wagmiConfig using defaultWagmiConfig
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // Optional: Add custom Wagmi options if needed
});

// 5. Create Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional
  enableOnramp: true, // Optional
});

// Web3ModalProvider component
export const Web3ModalProvider: React.FC<Web3ModalProviderProps> = ({ children }) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  );
};
