import { FC, useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import SelectCoinModal from '../modal/SelectCoinModel/selectCoinModal'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { ThemeContext } from 'context/themeContext'

import SelectDexModal from '../modal/SelectCoinModel/selectDexCoinModal'
import { CantFind, swapIcon, swapLight } from 'Helpers/assets'
const SelectCoin: FC = () => {
  const [showToken1Modal, setShowToken1Modal] = useState(false)
  const [showToken2Modal, setShowToken2Modal] = useState(false)
  const history = useHistory()

  const { theme } = useContext(ThemeContext)

  function addDefaultSrc(ev) {
    ev.target.src = CantFind
  }

  const { allCoinList, allCoinList2, setQpTokens, selectedDex, tokenBalance, token1, setToken1, token2, setToken2 } =
    useContext(WalletContext)

  const handleToken1Change = (id: string) => {
    history.push('/')
    setQpTokens({})
    setToken1(allCoinList.find((item) => item.address === id))
    setShowToken1Modal(false)
  }

  const handleToken2Change = (id: string) => {
    history.push('/')
    setQpTokens({})
    setToken2(allCoinList2.find((item) => item.address === id))
    setShowToken2Modal(false)
  }

  const liquidityContainer = (
    <div className="liquidityContainer">
      <div className="liquidity">
        Liquidity: {tokenBalance?.decimalAmount ? parseFloat(tokenBalance.decimalAmount).toLocaleString() : '0'}
      </div>
    </div>
  )

  const TokenButton = ({ handleClick, token, disabled }) => (
    <Button className="switch-btn" onClick={() => handleClick(true)} disabled={disabled}>
      {token ? (
        <span>
          <img alt="Logo" src={token.logoURI ?? CantFind} onError={addDefaultSrc} className="custom-selectdex-logo" />
          {token.symbol}
        </span>
      ) : (
        'Select Coin'
      )}
    </Button>
  )

  const SwapConnecter = (
    <div className="swap-container">
      <hr className={token1 ? 'lineGreen' : 'line'} />
      <div className="swapicon-container">
        <img src={theme === 'dark' ? swapIcon : swapLight} alt="swapicon" />
      </div>
      <hr className={token2 ? 'lineGreen' : 'line'} />
    </div>
  )
  return (
    <>
      {liquidityContainer}
      <div className={`selectCoin`}>
        <TokenButton handleClick={() => setShowToken1Modal(true)} token={token1} disabled={false} />
        {SwapConnecter}
        <TokenButton handleClick={() => setShowToken2Modal(true)} token={token2} disabled={!selectedDex} />
      </div>

      <SelectCoinModal
        show={showToken1Modal}
        hideHandler={() => setShowToken1Modal(false)}
        handleToken1Change={(id) => {
          handleToken1Change(id)
        }}
      />
      <SelectDexModal
        show={showToken2Modal}
        hideHandler={() => setShowToken2Modal(false)}
        handleToken2Change={(id) => {
          handleToken2Change(id)
        }}
      />
    </>
  )
}

export default SelectCoin
