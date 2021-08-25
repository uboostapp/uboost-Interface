import { CantFind } from 'Helpers/assets'
import { Button } from 'react-bootstrap'
export const ImportSection = ({ isPoolExist, searchedToken, onImport }) => {
  function addDefaultSrc(ev) {
    ev.target.src = CantFind
  }

  return (
    <>
      {isPoolExist ? (
        <div className="selectcoin-list searched-list" key={`${searchedToken.address}${searchedToken.chainId}`}>
          <img alt="Logo" src={searchedToken.logoURI ?? CantFind} className="coin-logo" onError={addDefaultSrc} />
          <span className="coin-title">{searchedToken.symbol}</span>
          <div className={'list-balance'}>
            <Button onClick={onImport} className="modal-btn">
              Add
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '250px' }}>
          {searchedToken.dexId ? (
            <div className="notokenfound-container">
              <h1>Token liquidity unavailable on DEX</h1>
            </div>
          ) : (
            <div className="nopoolfound-container">
              <h1>No pool found on UniLend</h1>
              <p>
                It seems the pool for your custom token address is yet not created on UniLend.Please visit Unilend and
                create a pool.
              </p>
              <div className="visituni-btn">
                <a href="https://app.unilend.finance" target="_blank" rel="noreferrer">
                  Visit Unilend App
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
