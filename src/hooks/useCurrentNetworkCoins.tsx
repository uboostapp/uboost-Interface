import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { useContext, useEffect, useState } from 'react'
import { checkNetwork } from 'Helpers'

export function useCurrentNetworkCoin() {
  const [currentNetworkCoins, setCurrentNetworkCoins] = useState<any>()
  const { selectedNetwork, allCoinList, isConnected, selectedChain } = useContext(WalletContext)

  useEffect(() => {
    if (isConnected === false) {
      let coins =
        allCoinList &&
        allCoinList.filter((coin) => {
          return checkNetwork(coin.chainId) === selectedChain.name
        })
      setCurrentNetworkCoins(coins)
    } else {
      let coins =
        allCoinList &&
        allCoinList.filter((coin) => {
          return coin.chainId === selectedNetwork.id
        })
      setCurrentNetworkCoins(coins)
    }
  }, [selectedNetwork, isConnected, allCoinList, selectedChain])

  return currentNetworkCoins
}
