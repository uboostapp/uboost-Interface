import WalletProvider from "context/connectWallet/connectWalletContext";
import ThemeProvider from "context/themeContext";

export function Provider(props) {
  return (
    <ThemeProvider>
      <WalletProvider>{props.children}</WalletProvider>
    </ThemeProvider>
  );
}
