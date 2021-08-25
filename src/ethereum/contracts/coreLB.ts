import { setTimestamp } from 'Helpers'
import { coreContractAddress, unilendCoreContract } from '.'
import BoostABI from '../build/boostABI.json'
import FlashloanABI from '../build/FlashLoanABI.json'
import IERCABI from '../build/IERC20.json'
const getContract = (abi: any, address: any, web3: any) => {
  return new web3.eth.Contract(abi, address)
}

export const getCoreContract = (web3: any, address?: string) => {
  return getContract(BoostABI, coreContractAddress, web3)
}

export const getUnilendCoreContract = (web3: any) => {
  return getContract(FlashloanABI.abi, unilendCoreContract, web3)
}

export const iercContract = (web3: any, address: any) => {
  return getContract(IERCABI.abi, address, web3)
}

export async function poolExist(web3: any, address: string) {
  let isExist
  await getUnilendCoreContract(web3)
    .methods.Pools(address)
    .call((err: any, res: any) => {
      if (!err) {
        isExist = res !== '0x0000000000000000000000000000000000000000'
      } else {
        isExist = false
      }
    })
  return isExist
}

export async function getPoolBalance(web3: any, token: any) {
  let timestamp = setTimestamp()
  return await getUnilendCoreContract(web3)
    .methods.poolBalanceOfUnderlying(token.address, timestamp)
    .call((e: any, r: any) => {
      if (!e) {
        return r
      } else {
        return null
      }
    })
}
