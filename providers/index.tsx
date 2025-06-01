import WalletProviderWrapper from "./walletProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <WalletProviderWrapper>{children}</WalletProviderWrapper>;
}
