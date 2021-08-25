import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { useContext, useEffect, useState } from 'react'

export function useCurrentNetworkToken() {
  const [currentNetworkToken, setCurrentNetworkToken] = useState<any>()
  const { selectedNetwork, selectedDex, allCoinList2 } = useContext(WalletContext)

  useEffect(() => {
    let coins =
      allCoinList2 &&
      allCoinList2.filter((coin) => {
        return selectedDex 
          ? coin.chainId === selectedNetwork.id && coin.dexId === selectedDex.id
          : coin.chainId === selectedNetwork.id
      })
    setCurrentNetworkToken(coins)
  }, [selectedNetwork, allCoinList2, selectedDex])

  return currentNetworkToken
}
