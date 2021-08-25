import { dexList } from 'common'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { useContext, useEffect, useState } from 'react'

export function useCurrentChainSwap() {
  const [currentChainSwap, setCurrentChainSwaps] = useState<any>()
  const { selectedChain } = useContext(WalletContext)
  
  useEffect(() => {
    let dexs = dexList.filter((dex) => {
      return dex.network === selectedChain.id
    })
    setCurrentChainSwaps(dexs)
  }, [selectedChain])

  return currentChainSwap
}
