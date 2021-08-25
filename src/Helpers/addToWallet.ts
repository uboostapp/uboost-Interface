declare const window: any

export function addToWallet(chainId: number) {
  const provider = window.ethereum

  if (chainId === 56) {
    return provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${chainId.toString(16)}`,
          chainName: 'Smart Chain',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'bnb',
            decimals: 18,
          },
          rpcUrls: ['https://bsc-dataseed.binance.org/'],
          blockExplorerUrls: ['https://bscscan.com/'],
        },
      ],
    })
  } else if (chainId === 137) {
    return provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${chainId.toString(16)}`,
          chainName: 'Matic Mainnet',
          nativeCurrency: {
            name: 'Matic',
            symbol: 'matic',
            decimals: 18,
          },
          rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
          blockExplorerUrls: ['https://explorer.matic.network/'],
        },
      ],
    })
  }
}
