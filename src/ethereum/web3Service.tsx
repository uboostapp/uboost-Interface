import BigNumber from 'bignumber.js'
import { eToNumber } from 'Helpers'
import web3 from './web3'

export const web3Service = {
  getAccounts: () => {
    return web3.eth.getAccounts()
  },
  getBalance: (address: string) => {
    return web3.eth.getBalance(address)
  },
  getWei: (payload: any, curr: string) => {
    return web3.utils.fromWei(payload, curr)
  },
  getValue: (isEth: any, web3: any, amount: any, decimal: any) => {
    return isEth
      ? web3.utils.toWei(amount, 'ether')
      : new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString()
  },
  getFee: (amount) => {
    let percent = new BigNumber('0.05').div(100)
    let fee = new BigNumber(amount).times(percent).toString()
    return eToNumber(fee)
  },
  getDexFee: (amount, selectedDex) => {
    let percent = new BigNumber(selectedDex?.fee).times(2).div(100)
    let fee = new BigNumber(amount).times(percent).toString()
    return eToNumber(fee)
  },
}
