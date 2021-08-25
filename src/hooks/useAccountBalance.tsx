import { connectWalletWeb3 } from 'ethereum/web3'
import { web3Service } from 'ethereum/web3Service'
import { useState } from 'react'
declare const window: any

export function useAccountBalance() {
  const [ethBalance, setEthBalance] = useState<string>()

  const getAccountBalance = async (selectedAccount: string, currentProvider: any, networkId?: number) => {
    try {
      let balance: string
      if (networkId && networkId === 2) {
        balance = await window.BinanceChain.request({
          method: 'eth_getBalance',
          params: [selectedAccount, 'latest'],
        })
      } else {
        balance = await web3Service.getBalance(selectedAccount)
        if (currentProvider === connectWalletWeb3) {
          balance = await currentProvider.eth.getBalance(selectedAccount)
        }
      }
      let ethBal = web3Service.getWei(balance, 'ether')
      // let ethBalDeci = toFixed(parseFloat(ethBal), 3);
      setEthBalance(ethBal)
    } catch (e) {
      setEthBalance('')
    }
  }
  return { ethBalance, getAccountBalance }
}
