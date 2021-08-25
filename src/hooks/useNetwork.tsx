import { checkNet } from 'Helpers'
import { useState } from 'react'
import { WalletNetwork } from 'utils/types'

export default function useNetwork() {
  const [selectedNetwork, setSelectedNetwork] = useState<WalletNetwork>({
    id: 1,
    name: 'Mainnet',
  })

  const [networkError, setNetworkError] = useState<string>('')

  const networkMessage = (chainId: number) => {
    if (selectedNetwork.id !== 1 && selectedNetwork.id !== 3 && chainId === 1) {
      setNetworkError(`Please switch your Network to Ethereum.`)
    } else if (selectedNetwork.id !== 56 && selectedNetwork.id !== 97 && chainId === 2) {
      setNetworkError(`Please switch your Network to Binance`)
    } else if (selectedNetwork.id !== 80001 && selectedNetwork.id !== 137 && chainId === 3) {
      setNetworkError(`Please switch your Network to Polygen`)
    } else {
      setNetworkError('')
    }
  }

  const networkSwitchHandling = async (web3: any, id?: number) => {
    if (id) {
      let accsName = checkNet(id)
      setSelectedNetwork({
        id: id,
        name: accsName,
      })
    } else {
      await web3.currentProvider.eth.net.getId().then((res: number) => {
        let accsName = checkNet(res)
        setSelectedNetwork({
          id: res,
          name: accsName,
        })
      })
    }
  }

  return { selectedNetwork, networkError, onNetworkMessage: networkMessage, networkSwitchHandling }
}
