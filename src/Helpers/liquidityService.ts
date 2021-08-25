import axios from 'axios'

export const getTokenLiquidity = (swap: number, address: string) => {
  let _uri: any
  let _query: any = `
      {
          tokens(
              where: {id: "${address.toLowerCase()}"}
          ) {
            totalLiquidity
          }
      }
      `
  switch (swap) {
    case 1:
      _uri = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
      _query = `
      {
          tokens(
              where: {id: "${address.toLowerCase()}"}
          ) {
            totalLiquidity
          }
      }
      `
      break
    case 2:
      _uri = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06'

      break
    case 3:
      _uri = 'https://api.thegraph.com/subgraphs/name/ss-sonic/dfyn-v5'
      break

    case 4:
      _uri = 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2'
      break
    case 5:
      _uri = 'https://api.thegraph.com/subgraphs/name/polydex-ws/polydex_02'
      break
    default:
      break
  }
  return axios({
    method: 'post',
    url: _uri,
    data: {
      query: _query,
    },
  })
    .then(async (result) => {
      return result.data.data
    })
    .catch((err) => err)
}
