/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import TransactionLoaderModal from '../modal/TransactionLoaderModel/transactionLoaderModel'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { CantFind } from 'Helpers/assets'
import ConnectWalletModal from '../modal/ConnectWalletModel/connectWalletModal'
import BigNumber from 'bignumber.js'

const TransactionCard: FC = () => {
  const [transactionModel, setTransactionModel] = useState(false)
  const [modalShow, setModalShow] = useState<boolean>(false)
  // const [showSuccess, setShowSuccess] = useState<boolean>(true)
  const {
    tokenBalance,
    amount,
    setAmount,
    token1,
    token2,
    selectedDex,
    isTransferring,
    transactionSuccess,
    connectedAccount,
    isApproved,
    isApproving,
    handleApproval,
    isConnected,
    token1Balance,
  } = useContext(WalletContext)

  useEffect(() => {
    if (transactionSuccess.length) {
      setTransactionModel(true)
      setAmount('')
    }
  }, [transactionSuccess])

  const handleChange = (event) => {
    const re = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/
    if (event.target.value === '' || re.test(event.target.value)) {
      setAmount(event.target.value)
    }
  }

  const handleMax = () => {
    setAmount(tokenBalance.fullAmount)
  }
  function addDefaultSrc(ev) {
    ev.target.src = CantFind
  }

  return (
    <>
      <div className={`transactionCard`}>
        <div className="transactionHeader">
          <div className="header">
            <h3>Amount</h3>
            {token1 && <p>Enter liquidity from pool of {token1.symbol} on UniLend</p>}
          </div>
          <p className="balance-container">
            {token1Balance && connectedAccount && (
              <>
                <span className="balance">Balance: {token1Balance.decimal}</span>
                <img
                  src={token1 ? token1.logoURI : CantFind}
                  alt="dollar-logo"
                  onError={addDefaultSrc}
                  className="custom-dollarlogo"
                />
              </>
            )}
          </p>
        </div>
        <Card className={`input-card`}>
          <Card.Body>
            <div className={`transactionBody`}>
              <input type="text" placeholder="0.0" value={amount} onChange={handleChange} />
              {tokenBalance.fullAmount > 0 ? (
                <Button className={`max-button`} onClick={handleMax}>
                  Max
                </Button>
              ) : (
                <div></div>
              )}
            </div>
          </Card.Body>
        </Card>
        <div className={`main-action`}>
          {isConnected && connectedAccount ? (
            !token1 || isApproved ? (
              <Button
                disabled={
                  !token1 ||
                  !token2 ||
                  !selectedDex ||
                  token1 === undefined ||
                  token2 === undefined ||
                  selectedDex === undefined ||
                  amount === '' ||
                  !amount ||
                  new BigNumber(amount).gt(tokenBalance.fullAmount) ||
                  isTransferring
                }
                className="switch-btn selected main-action-btn"
                onClick={() => {
                  setTransactionModel(true)
                }}
              >
                {isTransferring ? 'Loading...' : 'Make a flash Transfer'}
              </Button>
            ) : (
              <Button
                disabled={
                  token1 === undefined ||
                  token2 === undefined ||
                  selectedDex === undefined ||
                  amount === '' ||
                  isApproving
                }
                className="switch-btn selected main-action-btn"
                onClick={handleApproval}
              >
                {isApproving ? (
                  <div>
                    Approving
                    <div className={`spinner-border approve-loader`} role="status">
                      <span className="sr-only">Approving...</span>
                    </div>
                  </div>
                ) : (
                  'Approve'
                )}
              </Button>
            )
          ) : (
            <Button className="switch-btn main-action-btn" onClick={() => setModalShow(true)}>
              Connect wallet
            </Button>
          )}
        </div>
        <ConnectWalletModal show={modalShow} onHide={() => setModalShow(false)} />
        <TransactionLoaderModal
          show={transactionModel}
          close={() => setTransactionModel(false)}
          successMessage={transactionSuccess}
        />

        {/* {transactionSuccess !== '' && (
          <TransactionCompletedModal
            show={showSuccess}
            close={() => setShowSuccess(false)}
            successMessage={transactionSuccess}
          />
        )} */}
      </div>
    </>
  )
}

export default TransactionCard
