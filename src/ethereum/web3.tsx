import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

let web3: any;

web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export const connectWalletProvider: any = new WalletConnectProvider({
  infuraId: `${process.env.REACT_APP_INFURA_ID}`,
});
export const connectWalletWeb3 = new Web3(connectWalletProvider);

export default web3;
