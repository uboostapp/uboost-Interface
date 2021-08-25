import axios, { AxiosError, AxiosResponse } from 'axios'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function useTokenSearch() {
  const [searchedToken, setSearchedToken] = useState<any>()

  const { selectedChain, selectedNetwork } = useContext(WalletContext)

  const handleSearchHttp = (network: number, address: string) => {
    const api = 'ckey_86f9398035604a998979408cd03'
    var qs = `?key=${api}`
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
            chainId: selectedNetwork.id,
            isCustomToken: true,
          }
          setSearchedToken(body)
        } else {
          setSearchedToken(null)
        }
      })
      .catch((e: AxiosError) => {
        setSearchedToken(null)
      })
  }

  const searchToken = (address?: string) => {
    if (address) {
      if (selectedChain?.id === 1) {
        const _url =
          selectedNetwork.id === 3
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
                chainId: selectedNetwork.id,
                isCustomToken: true,
              }
              setSearchedToken(body)
            }
          })
          .catch((e: AxiosError) => {
            setSearchedToken(null)
          })
      } else if (selectedChain!.id === 2) {
        handleSearchHttp(56, address)
      } else if (selectedChain!.id === 3) {
        handleSearchHttp(137, address)
      }
    } else {
      setSearchedToken(null)
    }
  }

  return { searchedToken, searchToken }
}
