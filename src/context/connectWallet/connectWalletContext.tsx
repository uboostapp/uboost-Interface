/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { chainList, dexList } from 'common'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { v4 as uuidv4 } from 'uuid'
import web3, { connectWalletProvider, connectWalletWeb3 } from 'ethereum/web3'
import { web3Service } from 'ethereum/web3Service'
import { Chain, Wallet } from 'utils/types'
import { addToWallet } from 'Helpers/addToWallet'

import useNetwork from 'hooks/useNetwork'
import useFlashTransfer from 'hooks/useFlashTransfer'
import { useApproval } from 'hooks/useApproval'
// import { useTokenBalance } from 'hooks/useTokenBalance'
import { useCustomToken } from 'hooks/useCustomToken'
import { useAccountBalance } from 'hooks/useAccountBalance'
import { getPoolBalance } from 'ethereum/contracts/coreLB'
import { toFixed } from 'Helpers'
import { useTokenBalance } from 'hooks/useTokenBalance'
import BigNumber from 'bignumber.js'

declare const window: any
let EthProvider = window.ethereum

export const WalletContext = createContext<any>(null)

export default function WalletProvider(props) {
  const [isConnecting, toggleConnecting] = useState<boolean>(false)
  const [connectedAccount, setConnectedAccount] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [searchedToken, setSearchedToken] = useState<any>()
  const [token1, setToken1] = useState<any>(undefined)
  const [token2, setToken2] = useState<any>(undefined)
  const [selectedDex, setDex] = useState<any>()
  const [qpTokens, setQpTokens] = useState<any>()
  const [maxLiquidity, setMaxLiquidity] = useState<string>()
  const [fee, setFee] = useState<any>({
    total: '',
    uni: '',
    dex: '',
  })

  const [walletProvider, setWalletProvider] = useState({
    currentProvider: web3,
    provider: EthProvider,
  })

  const [tokenBalance, setTokenBalance] = useState({
    decimalAmount: '',
    fullAmount: '',
  })

  const [isConnected, toggleConnected] = useState<boolean>(() => {
    let _cache = Cookies.get('isConnected')
    return _cache ?? false
  })

  const [connectedWallet, setConnectedWallet] = useState<Wallet | undefined>(() => {
    let _cache = Cookies.getJSON('wallet')
    return _cache ?? null
  })

  const [selectedChain, setSelectedChain] = useState<Chain | undefined>(() => {
    let _cookie = Cookies.getJSON('selectedChain')
    return _cookie ? chainList.find((list) => list.id === _cookie) : chainList[0]
  })

  const { selectedNetwork, networkError, onNetworkMessage, networkSwitchHandling } = useNetwork()

  const { isTransferring, transferHash, transferError, transactionSuccess, handleFlashTransfer, resetTransaction } =
    useFlashTransfer()

  const { isApproving, isApproved, tokenApproval: tokenAllowance, approveToken } = useApproval()

  const { allCoinList, allCoinList2, tokenImportHandler, token2ImportHandler } = useCustomToken()

  const { ethBalance, getAccountBalance } = useAccountBalance()
  const { tokenBalance: token1Balance, getTokenBalance } = useTokenBalance()
  useEffect(() => {
    let interval

    interval = setInterval(() => {
      if (token1?.address && connectedAccount) {
        getTokenBalance(token1, connectedAccount, walletProvider.currentProvider)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [token1, connectedAccount, walletProvider])

  useEffect(() => {
    if (token1 && connectedAccount) {
      let web3 = walletProvider.currentProvider
      tokenAllowance(token1.address, connectedAccount, web3)
    }
  }, [token1, isConnected, walletProvider, connectedAccount])

  useEffect(() => {
    if (token1) {
      fetchPoolBalance(walletProvider.currentProvider, token1)
    }
  }, [walletProvider, token1])

  useEffect(() => {
    if (connectedWallet !== null && connectedWallet !== undefined) Cookies.set('wallet', connectedWallet)
  }, [connectedWallet])

  useEffect(() => {
    setDex('')
    setToken2('')
    setAmount('')
  }, [selectedChain])

  useEffect(() => {
    if (isConnected) networkSwitchHandling(walletProvider)
    Cookies.set('isConnected', isConnected)
  }, [isConnected])

  useEffect(() => {
    if (isConnected && connectedWallet) handleConnect(connectedWallet)
  }, [selectedChain, connectedWallet, isConnected])

  useEffect(() => {
    if (isConnected) onNetworkMessage(selectedChain!.id)
  }, [isConnected, selectedNetwork, selectedChain])

  useEffect(() => {
    let uniFee = web3Service.getFee(amount)
    let dexFee = web3Service.getDexFee(amount, selectedDex)
    let fee = new BigNumber(uniFee).plus(dexFee).toString()
    setFee({
      total: fee,
      uni: uniFee,
      dex: dexFee,
    })
  }, [amount, selectedDex])

  useEffect(() => {
    const getToken = async () => {
      if (qpTokens?.main_token) {
        let token = await allCoinList.find((item) => {
          return item.address.toLowerCase() === qpTokens.main_token.toLowerCase()
        })
        if (token) {
          setToken1(token)
        }
      }
      if (qpTokens?.base_token) {
        let token = allCoinList2.find((item) => item.address.toLowerCase() === qpTokens.base_token.toLowerCase())
        if (token) setToken2(token)
      }
      if (qpTokens?.dex) {
        let dex = dexList.find((item) => item.name.toLowerCase() === qpTokens.dex.toLowerCase())
        if (dex) setDex(dex)
      }
      if (qpTokens?.network) {
        let network = await chainList.find((item) => item.name.toLowerCase() === qpTokens.network.toLowerCase())
        if (network) handleChainChange(network.id)
      }
    }
    getToken()
  }, [qpTokens, allCoinList, allCoinList2])

  const fetchPoolBalance = async (web3, token) => {
    let poolBalance = await getPoolBalance(web3, token)
    if (poolBalance) {
      let fullAmount = poolBalance / Math.pow(10, token.decimals)
      let decimalAmount = toFixed(fullAmount, 3)
      setTokenBalance({
        decimalAmount: decimalAmount.toString(),
        fullAmount: fullAmount.toString(),
      })
    }
  }

  const handleApproval = () => {
    if (token1 && connectedAccount) {
      let web3 = walletProvider.currentProvider
      approveToken(token1.address, connectedAccount, web3)
    }
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
                id: uuidv4(),
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

  const searchToken2 = (address?: string) => {
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
                id: uuidv4(),
                address: address,
                decimals: _response.decimals,
                logoURI: _response.logo,
                name: _response.name,
                symbol: _response.symbol,
                chainId: selectedNetwork.id,
                dexId: selectedDex.id,
                isCustomToken: true,
              }
              setSearchedToken(body)
            }
          })
          .catch((e: AxiosError) => {
            setSearchedToken(null)
          })
      } else if (selectedChain!.id === 2) {
        handleSearch2Http(56, address)
      } else if (selectedChain!.id === 3) {
        handleSearch2Http(137, address)
      }
    } else {
      setSearchedToken(null)
    }
  }

  const handleSearch2Http = (network: number, address: string) => {
    const api = 'ckey_86f9398035604a998979408cd03'
    var qs = `?key=${api}`
    axios
      .get(`https://api.covalenthq.com/v1/${network}/tokens/${address}/nft_metadata/111/${qs}`)
      .then((res: AxiosResponse) => {
        if (res?.data?.data) {
          let item = res.data.data.items[0]
          let body = {
            id: item.contract_id,
            address: item.contract_address,
            decimals: item.contract_decimals,
            logoURI: item.logo_url,
            name: item.contract_name,
            symbol: item.contract_ticker_symbol,
            chainId: selectedNetwork.id,
            dexId: selectedDex.id,
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

  const handleSearchHttp = (network: number, address: string) => {
    const api = 'ckey_86f9398035604a998979408cd03'
    var qs = `?key=${api}`
    axios
      .get(`https://api.covalenthq.com/v1/${network}/tokens/${address}/nft_metadata/111/${qs}`)
      .then((res: AxiosResponse) => {
        if (res?.data?.data) {
          let item = res.data.data.items[0]
          let body = {
            id: item.contract_id,
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

  const handleChainChange = (id: number) => {
    let _chain: Chain | undefined = chainList.find((list: Chain) => list.id === id)
    if (_chain) {
      setSelectedChain(_chain)
      Cookies.set('selectedChain', id)
    }
  }

  const metamaskEventHandler = (provider: any) => {
    provider.on('chainChanged', (chainId: any) => {
      window.location.reload()
    })
    provider.on('accountsChanged', function (accounts: string) {
      setConnectedAccount(accounts[0])
    })
    provider.on('message', (message: string) => {
      // console.log(message)
    })
    provider.on('disconnect', (code: number, reason: string) => {})
  }

  const handleMetamask = (accounts: string[], currentProvider: any) => {
    if (window && !window.ethereum.selectedAddress) {
      window.ethereum
        .enable()
        .then(() => {
          web3Service
            .getAccounts()
            .then((res: string[]) => {
              setConnectedAccount(res[0])
              getAccountBalance(res[0], currentProvider)
              metamaskEventHandler(window.ethereum)
              toggleConnecting(false)
              toggleConnected(true)
            })
            .catch((e: any) => {
              toggleConnecting(false)
              toggleConnected(false)
            })
        })
        .catch((e: any) => {
          toggleConnecting(false)
        })
    } else {
      setConnectedAccount(accounts[0])

      getAccountBalance(accounts[0], currentProvider)
      toggleConnected(true)

      metamaskEventHandler(window.ethereum)
      toggleConnecting(false)
    }
  }

  const handleConnect = (wallet: Wallet) => {
    toggleConnecting(true)
    setConnectedWallet(wallet)
    try {
      if (wallet) {
        let currentProvider: any
        let provider: any
        switch (wallet.walletName) {
          case 'Metamask':
            currentProvider = web3
            provider = EthProvider
            break
          case 'walletConnect':
            currentProvider = connectWalletWeb3
            provider = connectWalletProvider
            break
          default:
            currentProvider = web3
            provider = EthProvider
        }
        handleWallet(currentProvider, wallet)
        setWalletProvider({
          currentProvider,
          provider,
        })
      } else {
        toggleConnecting(false)
      }
    } catch (e) {
      toggleConnecting(false)
    }
  }

  const handleWallet = async (provider: any, selectedWallet: any) => {
    let accounts
    switch (selectedWallet.walletName) {
      case 'Metamask':
        if (selectedChain!.id === 1) {
          accounts = await web3Service.getAccounts()
          handleMetamask(accounts, provider)
        } else if (selectedChain!.id === 2) {
          try {
            if (window.ethereum && window.ethereum.selectedAddress) {
              const chainId = 56
              try {
                await addToWallet(chainId)
                accounts = await web3Service.getAccounts()
                handleMetamask(accounts, provider)
              } catch (error) {
                console.error('error', error)
                return false
              }
            } else {
              console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
              toggleConnecting(false)
              return false
            }
          } catch (e) {
            toggleConnecting(false)
          }
        } else if (selectedChain!.id === 3) {
          try {
            if (window.ethereum) {
              const provider = window.ethereum
              const chainId = 137
              try {
                await addToWallet(chainId)

                accounts = await web3Service.getAccounts()
                handleMetamask(accounts, provider)
                return true
              } catch (e) {
                console.error(e)
                return false
              }
            } else {
              if (window.ethereum) {
                accounts = await web3Service.getAccounts()
                handleMetamask(accounts, provider)
              }
              console.error("Can't setup the Matic network on metamask because window.ethereum is undefined")
              toggleConnecting(false)
              return false
            }
          } catch (e) {
            toggleConnecting(false)
          }
        }
        break
      case 'WalletConnect':
        try {
          let provider: any = connectWalletProvider
          await provider.enable().then((response: any) => {
            metamaskEventHandler(connectWalletProvider)
          })
          await connectWalletWeb3.eth.getAccounts().then((res: any) => {
            setConnectedAccount(res[0])
          })
        } catch (e) {
          toggleConnecting(false)
        }
        break
      default:
        break
    }
  }

  const disconnectHandler = () => {
    toggleConnected(false)
    setConnectedWallet(undefined)
    Cookies.remove('wallet')
    Cookies.remove('isConnected')
  }

  const flashTransferHandling = () => {
    handleFlashTransfer(walletProvider.currentProvider, amount, connectedAccount, token1, token2, selectedDex)
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        isConnecting,
        allCoinList,
        allCoinList2,
        connectedAccount,
        searchedToken,
        selectedNetwork,
        selectedChain,
        networkError,
        walletProvider,
        isTransferring,
        transferHash,
        transferError,
        ethBalance,
        amount,
        tokenBalance,
        token1,
        token2,
        selectedDex,
        transactionSuccess,
        isApproved,
        isApproving,
        qpTokens,
        token1Balance,
        fee,
        maxLiquidity,
        setMaxLiquidity,
        resetTransaction,
        setDex,
        setToken2,
        setToken1,
        setAmount,
        handleApproval,
        flashTransferHandling,
        handleConnect,
        handleChainChange,
        searchToken,
        searchToken2,
        tokenImportHandler,
        token2ImportHandler,
        disconnectHandler,
        setQpTokens,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  )
}
