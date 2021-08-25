import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { getAddressUrl } from 'Helpers'
import { useContext, useEffect } from 'react'
import { useState } from 'react'

const UseExplorer = (address) => {
  const [explorerUri, setExplorerUri] = useState<string>('')
  const { selectedNetwork } = useContext(WalletContext)

  useEffect(() => {
    if (selectedNetwork) {
      setExplorerUri(getAddressUrl(selectedNetwork.name.toLowerCase(), address))
    }
  }, [selectedNetwork, address])

  return explorerUri
  
}

export default UseExplorer
