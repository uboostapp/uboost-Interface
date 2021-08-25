import { approveTokenMaximumValue, coreContractAddress } from 'ethereum/contracts'
import { iercContract } from 'ethereum/contracts/coreLB'
import { useState } from 'react'

export function useApproval() {
  const [isApproved, toggleApproved] = useState<boolean>(false)
  const [isApproving, toggleApproving] = useState<boolean>(false)
  const tokenApproval = (token, account: string, web3: any) => {
    let allowance
    iercContract(web3, token)
      .methods.allowance(account, coreContractAddress)
      .call((error: any, result: any) => {
        if (!error && result) {
          allowance = result
          if (allowance === '0') {
            toggleApproved(false)
          } else {
            toggleApproved(true)
          }
        }
      })
  }

  const approveToken = (token: any, account: string, web3: any) => {
    toggleApproving(true)
    iercContract(web3, token)
      .methods.approve(coreContractAddress, approveTokenMaximumValue)
      .send({ from: account })
      .on('receipt', (res: any) => {
        toggleApproved(true)
        toggleApproving(false)
      })
      .on('error', (err: any, res: any) => {
        toggleApproved(false)
        toggleApproving(false)
      })
  }

  return { isApproving, isApproved, tokenApproval, approveToken }
}
