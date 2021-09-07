import {
  MetamaskLogo,
  ConnectWalletLogo,
  PolygonLogo,
  polyDexImg,
  EthereumLogo,
  BinanceLogo,
  cryptinImg,
} from 'Helpers/assets'
import { Chain, DexType, Wallet, TokenList } from 'utils/types'

export const walletList = (chain: number): Wallet[] => {
  let list: Wallet[] = [
    {
      id: 1,
      walletName: 'Metamask',
      logo: MetamaskLogo,
    },
  ]

  return chain === 1
    ? [
        ...list,
        {
          id: 2,
          walletName: 'WalletConnect',
          logo: ConnectWalletLogo,
        },
      ]
    : list
}

export const chainList: Chain[] = [
  // {
  //   id: 1,
  //   name: 'Ethereum',
  //   logo: EthereumLogo,
  // },
  // {
  //   id: 2,
  //   name: 'Binance',
  //   logo: BinanceLogo,
  // },
  {
    id: 3,
    name: 'Polygon',
    logo: PolygonLogo,
  },
]

export const dexList: DexType[] = [
  {
    id: 1,
    name: 'UniSwap',
    routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    network: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    fee: 0.3,
  },
  {
    id: 2,
    name: 'QuickSwap',
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    network: 3,
    logoURI: 'https://i.imgur.com/8G7QIrR.png',
    fee: 0.3,
  },
  {
    id: 3,
    name: 'Dfyn',
    routerAddress: '0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429',
    network: 3,
    logoURI: 'https://raw.githubusercontent.com/dfyn/assets/main/DFYN_logo.png',
    fee: 0.3,
  },
  {
    id: 4,
    name: 'PancakeSwap',
    routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    network: 2,
    logoURI: 'https://raw.githubusercontent.com/pancakeswap/pancake-frontend/develop/public/logo.png',
    fee: 0.2,
  },
  // {
  //   id: 5,
  //   name: 'PolyDex',
  //   routerAddress: '0xBd13225f0a45BEad8510267B4D6a7c78146Be459',
  //   network: 3,
  //   logoURI: polyDexImg,
  //   fee: 0.3,
  // },
]

export const tokenList: TokenList[] = [
  {
    id: 1,
    name: 'Uniswap',
    address: '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
    symbol: 'UNI',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    dexId: 1,
  },
  {
    id: 2,
    name: 'Uniswap',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    symbol: 'UNI',
    decimals: 18,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    dexId: 1,
  },
  {
    id: 3,
    name: 'Uniswap',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    symbol: 'UNI',
    decimals: 18,
    chainId: 3,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    dexId: 1,
  },
  {
    id: 4,
    name: 'Quickswap',
    address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    symbol: 'QUICK',
    decimals: 18,
    chainId: 137,
    logoURI: 'https://i.imgur.com/8G7QIrR.png',
    dexId: 2,
  },

  {
    id: 5,
    name: 'Quickswap',
    address: '0x6c28AeF8977c9B773996d0e8376d2EE379446F2f',
    symbol: 'QUICK',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://i.imgur.com/8G7QIrR.png',
    dexId: 2,
  },
  {
    id: 6,
    name: 'DFYN Token',
    address: '0xC168E40227E4ebD8C1caE80F7a55a4F0e6D66C97',
    symbol: 'DFYN',
    decimals: 18,
    chainId: 137,
    logoURI: 'https://raw.githubusercontent.com/dfyn/assets/main/DFYN_logo.png',
    dexId: 3,
  },
  {
    id: 7,
    name: 'ZeroSwapToken',
    address: '0xfd4959c06FbCc02250952DAEbf8e0Fb38cF9FD8C',
    symbol: 'ZEE',
    decimals: 18,
    chainId: 137,
    logoURI: 'https://pbs.twimg.com/profile_images/1366339230683652096/sit30Uuo_400x400.png',
    dexId: 4,
  },
  {
    id: 8,
    name: 'PancakeSwap',
    address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    symbol: 'Cake',
    decimals: 18,
    chainId: 56,
    logoURI: 'https://raw.githubusercontent.com/pancakeswap/pancake-frontend/develop/public/logo.png',
    dexId: 4,
  },
  {
    id: 9,
    name: 'Wrapped Ether',
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    symbol: 'WETH',
    decimals: 18,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    dexId: 1,
  },
  {
    id: 10,
    name: 'Wrapped Ether',
    address: '0xf70949bc9b52deffcda63b0d15608d601e3a7c49',
    symbol: 'WETH',
    decimals: 18,
    chainId: 3,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    dexId: 1,
  },
  {
    id: 11,
    name: 'Matic',
    address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    symbol: 'MATIC',
    decimals: 18,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    dexId: 1,
  },
  {
    id: 12,
    name: 'Matic',
    address: '0x0d19826a842c03e9458d4270a5941b3f043fa5db',
    symbol: 'MATIC',
    decimals: 18,
    chainId: 3,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    dexId: 1,
  },
  {
    id: 13,
    name: 'UniLend Finance Token',
    address: '0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1',
    symbol: 'UFT',
    decimals: 18,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1/logo.png',
    dexId: 1,
  },
  {
    id: 14,
    name: 'UniLend Finance Token',
    address: '0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1',
    symbol: 'UFT',
    decimals: 18,
    chainId: 3,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1/logo.png',
    dexId: 1,
  },
  {
    id: 15,
    name: 'Wrapped BNB',
    address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    symbol: 'WBNB',
    decimals: 18,
    chainId: 56,
    logoURI: 'https://cloudflare-ipfs.com/ipfs/QmPx8vRckSyfUPsRukExCLyhA1K9W6Ue43dBEM1L2NyX2D/',
    dexId: 4,
  },
  {
    id: 16,
    name: 'UniLend Finance Token',
    address: '0x2645d5f59d952ef2317c8e0aaa5a61c392ccd44d',
    symbol: 'UFT',
    decimals: 18,
    chainId: 56,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1/logo.png',
    dexId: 4,
  },
  {
    id: 17,
    name: 'Wrapped Matic',
    address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    dexId: 2,
  },
  {
    id: 19,
    name: 'Wrapped Ether',
    address: '0x5fb94e98de09789879076fc763429e1f2d0918b0',
    symbol: 'WETH',
    decimals: 18,
    chainId: 56,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    dexId: 4,
  },
  {
    id: 20,
    name: 'Wrapped Ether',
    address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    symbol: 'WETH',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    dexId: 2,
  },
  {
    id: 22,
    name: 'UniLend Finance Token',
    address: '0x5b4cf2c120a9702225814e18543ee658c5f8631e',
    symbol: 'UFT',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1/logo.png',
    dexId: 2,
  },
  {
    id: 23,
    name: 'Wrapped Matic',
    address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    dexId: 3,
  },
  {
    id: 25,
    name: 'Wrapped Ether',
    address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    symbol: 'ETH',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    dexId: 3,
  },
  {
    id: 26,
    name: 'Ethereum',
    address: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
    symbol: 'ETH',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    dexId: 3,
  },
  {
    id: 27,
    name: 'UniLend Finance Token',
    address: '0x5b4cf2c120a9702225814e18543ee658c5f8631e',
    symbol: 'UFT',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1/logo.png',
    dexId: 3,
  },

  {
    id: 29,
    name: 'Wrapped Matic',
    address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    dexId: 5,
  },
  {
    id: 30,
    name: 'Wrapped Matic',
    address: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    dexId: 5,
  },
  {
    id: 31,
    name: 'Wrapped Ether',
    address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    symbol: 'WETH',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    dexId: 5,
  },
  {
    id: 32,
    name: 'Ethereum',
    address: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
    symbol: 'ETH',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    dexId: 5,
  },
  {
    id: 33,
    name: 'UniLend Finance Token',
    address: '0x5b4cf2c120a9702225814e18543ee658c5f8631e',
    symbol: 'UFT',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1/logo.png',
    dexId: 5,
  },
  {
    id: 34,
    name: 'PolyDEX.Fi 2.0',
    address: '0xD1e6354fb05bF72A8909266203dAb80947dcEccF',
    symbol: 'CNT',
    decimals: 18,
    chainId: 137,
    logoURI: cryptinImg,
    dexId: 5,
  },
]
