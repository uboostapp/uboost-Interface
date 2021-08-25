import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { ThemeContext } from 'context/themeContext'
import { checkNetwork } from 'Helpers'
import { binDark, binLight, CantFind } from 'Helpers/assets'
import { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ThemeState } from 'utils/types'
function addDefaultSrc(ev) {
  ev.target.src = CantFind
}
export const Token = ({ token, tokenSelect, deleteHandler }) => {
  const data: ThemeState = useContext(ThemeContext)
  const { token1, token2 } = useContext(WalletContext)
  const [isDisabled, setIsDisabled] = useState(false)
  useEffect(() => {
    if (
      (!token1 && token2 && token && token.address === token2.address) ||
      (!token2 && token1 && token && token.address === token1.address) ||
      (token1 && token2 && token && token.address === token2.address) ||
      (token2 && token1 && token && token.address === token1.address)
    ) {
      setIsDisabled(true)
    }
  }, [token1, token2, token])

  return (
    <div
      className={`selectcoin-list ${isDisabled && 'disabled'}`}
      key={`${token.address}${token.chainId}`}
      onClick={tokenSelect}
    >
      <div className="coinlist-subcontainer">
        <img alt="Logo" src={token?.logoURI ?? CantFind} onError={addDefaultSrc} className="coin-logo" />
        <div className="coin-title">{token.symbol}</div>
      </div>
      <div className="delIcon-container">
        <Button className="modal-btn">{checkNetwork(token.chainId)}</Button>
        <div className={'list-balance'}>{token?.balance && token.balance}</div>
        {token.isCustomToken && (
          <img
            src={data.theme === 'light' ? binLight : binDark}
            className="delete-icon"
            alt="deletedIcon"
            onClick={deleteHandler}
          />
        )}
      </div>
    </div>
  )
}
