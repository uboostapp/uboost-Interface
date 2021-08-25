import axios, { AxiosResponse, AxiosError } from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const getToken = (address: string, chainId, networkId) => {
  if (chainId === 1) {
    const _url =
      networkId === 3
        ? 'https://eth-ropsten.alchemyapi.io/v2/maI7ecducWmnh8z5s2B1H2G4KzHkHMtb'
        : 'https://eth-mainnet.alchemyapi.io/v2/maI7ecducWmnh8z5s2B1H2G4KzHkHMtb'

    const data = {
      jsonrpc: '2.0',
      method: 'alchemy_getTokenMetadata',
      params: [`${address}`],
      id: uuidv4(),
    }

    axios
      .post(_url, JSON.stringify(data))
      .then((res: AxiosResponse) => {
        if (res?.data?.result) {
          let _response = res.data.result
          let body = {
            address: address,
            decimals: _response.decimals,
            logoURI: _response.logo,
            name: _response.name,
            symbol: _response.symbol,
            chainId: networkId,
            isCustomToken: true,
          }
          return body
        }
      })
      .catch((e: AxiosError) => {
        console.log(e)

        return null
      })
  } else {
    const api = 'ckey_86f9398035604a998979408cd03'
    var qs = `?key=${api}`
    let network = chainId === 2 ? 56 : 137
    axios
      .get(`https://api.covalenthq.com/v1/${network}/tokens/${address}/nft_metadata/111/${qs}`)
      .then((res: AxiosResponse) => {
        if (res?.data?.data) {
          let item = res.data.data.items[0]
          let body = {
            address: item.contract_address,
            decimals: item.contract_decimals,
            logoURI: item.logo_url,
            name: item.contract_name,
            symbol: item.contract_ticker_symbol,
            chainId: networkId,
            isCustomToken: true,
          }
          return body
        } else {
          return null
        }
      })
      .catch((e: AxiosError) => {
        return null
      })
  }
}
