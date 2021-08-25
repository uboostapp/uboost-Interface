import BigNumber from 'bignumber.js'
import { iercContract } from 'ethereum/contracts/coreLB'
import { useState } from 'react'

export function useTokenBalance() {
  const [tokenBalance, setTokenBalance] = useState<any>({
    balance: '',
    decimal: '',
  })
  const getTokenBalance = (token, account: string, web3: any) => {
    iercContract(web3, token.address)
      .methods.balanceOf(account)
      .call((error: any, result: any) => {
        if (!error && result) {
          let amount = result
          const fullAmount = new BigNumber(amount).dividedBy(Math.pow(10, token.decimals)).toString()
          let decimalAmount = new BigNumber(fullAmount).toFixed(3, 1).toString()
          setTokenBalance({
            balance: fullAmount,
            decimal: decimalAmount,
          })
        }
      })
  }

  return { tokenBalance, getTokenBalance }
}
