import Web3 from "web3";

let web3Provider;

web3Provider = new Web3(Web3.givenProvider || "http://localhost:8545");

export const web3 = web3Provider;
