export declare const window: any

export type ThemeState = {
  theme: string
  handleToggleTheme: () => void
}

export type Wallet = {
  id: number
  walletName: string
  logo: any
}

export type Chain = {
  id: number
  name: string
  logo: any
}

export type DexType = {
  id: number
  name: string
  routerAddress: string
  network: number
  logoURI: any
  fee: number
}

export type WalletNetwork = {
  id: number
  name: string
}

export type CoinList = {
  id: number
  name: string
  symbol: string
  address: string
}

export type TokenList = {
  id: number
  name: string
  address: string
  symbol: string
  decimals: number
  chainId: number
  logoURI: any
  dexId: number
}