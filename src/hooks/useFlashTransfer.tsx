import { getCoreContract } from 'ethereum/contracts/coreLB'
import { web3Service } from 'ethereum/web3Service'
import { useState } from 'react'

const useFlashTransfer = () => {
  const [isTransferring, toggleTransferring] = useState<boolean>(false)
  const [transferHash, setTransferHash] = useState('')
  const [transferError, setTransferError] = useState('')
  const [transactionSuccess, setTransactionSuccess] = useState('')
  const handleFlashTransfer = (web3: any, amount: string, account: string, token1: any, token2: any, dex: any) => {
    setTransactionSuccess('')
    let isEth = false
    let fullAmount = web3Service.getValue(isEth, web3, amount, token1.decimals)
    toggleTransferring(true)
    getCoreContract(web3)
      .methods.executeTrade(dex.routerAddress, token1.address, token2.address, fullAmount)
      .send({ from: account, gas: 400000 })
      .on('receipt', (res: any) => {
        setTransferHash(res.transactionHash)
        toggleTransferring(false)
        setTransactionSuccess(
          `Market making of ${token1.symbol} with ${token2.symbol} is successfully done on ${dex.name}`,
        )
      })
      .on('transactionHash', (hash: any) => {
        setTransferHash(hash)
      })
      .on('error', (err: any, res: any) => {
        setTransferError(res === undefined ? 'Approval Rejected' : 'Approval Failed')
        toggleTransferring(false)
        setTransactionSuccess('')
      })
  }

  const resetTransaction = () => {
    console.log('Resetting')
    setTransferHash('')
    setTransferError('')
    setTransactionSuccess('')
  }

  return { isTransferring, transferHash, transactionSuccess, transferError, handleFlashTransfer, resetTransaction }
}

export default useFlashTransfer
