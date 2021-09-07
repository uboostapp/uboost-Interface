/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Loader from 'react-loader-spinner'

import { Alert, CantFind, UboostLogo } from 'Helpers/assets'
import { getTransactionHashUrl } from 'Helpers'

import { ThemeContext } from 'context/themeContext'
import { WalletContext } from 'context/connectWallet/connectWalletContext'

import './transactionLoaderModel.scss'
import '../index.scss'
import BigNumber from 'bignumber.js'

const TransactionLoaderModal = (props) => {
  const data: any = useContext(ThemeContext)

  const {
    transferHash,
    transferError,
    resetTransaction,
    transactionSuccess,
    selectedNetwork,
    flashTransferHandling,
    token1,
    selectedDex,
    fee,
    amount,
    token1Balance,
    maxLiquidity,
  } = useContext(WalletContext)

  const [mode, setMode] = useState<string>('confirm')
  const [hash, setHash] = useState<any>()

  // useEffect(() => {
  //   console.log({ fee: fee, token1Balance: token1Balance, maxLiquidity: maxLiquidity, amount: amount })
  //   console.log(
  //     new BigNumber(fee.total).gt(new BigNumber(token1Balance.balance)) ||
  //       new BigNumber(maxLiquidity).lt(new BigNumber(amount)),
  //   )
  // }, [fee, amount, maxLiquidity, token1Balance])

  useEffect(() => {
    if (transferHash !== '') {
      setMode('success')
      setHash(getTransactionHashUrl(selectedNetwork.name.toLowerCase(), transferHash))
    } else setMode('confirm')
  }, [transferHash])

  useEffect(() => {
    if (transferError !== '') setMode('failure')
    else setMode('confirm')
  }, [transferError])

  useEffect(() => {
    if (transactionSuccess !== '') setMode('completed')
    setHash(getTransactionHashUrl(selectedNetwork.name.toLowerCase(), transferHash))
  }, [transactionSuccess])

  function hideHandler() {
    if (mode === 'failure' || mode === 'completed') {
      props.close()
      resetTransaction()
    } else {
      props.close()
    }
  }

  function confirmHandler() {
    setMode('loading')
    flashTransferHandling()
  }
  function addDefaultSrc(ev) {
    ev.target.src = CantFind
  }

  function transactionMethods() {
    switch (mode) {
      case 'confirm':
        return (
          <>
            <Modal.Header className="transactioncomp-modal-header" closeButton>
              <Modal.Title className="custom-modal-dollartitle">
                <span>Fees : {fee && fee.total && !fee.total.isNaN ? fee.total : '0'}</span>
                <br />
                <span className="dollarTitleSubContainer">
                  <h6>
                    Fee charged by Unilend is {fee?.uni} &nbsp;
                    <img
                      src={token1 ? token1.logoURI : CantFind}
                      alt="dollar-logo"
                      onError={addDefaultSrc}
                      className="custom-modal-dollarlogo"
                    />{' '}
                    + by {selectedDex?.name} is {fee?.dex}
                    &nbsp;
                    <img
                      src={token1 ? token1.logoURI : CantFind}
                      alt="dollar-logo"
                      onError={addDefaultSrc}
                      className="custom-modal-dollarlogo"
                    />{' '}
                  </h6>
                </span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="transactioncomp-modal-body">
              <h6>
                Confirming will lead to swapping of your tokens on the DEX. A small fee by UniLend is incured for Flash
                Loans.
                <br />
                <a
                  target="_blank"
                  className="transaction-readhere-link"
                  href="https://docs.unilend.finance/the-protocol/flash-loan"
                  rel="noreferrer"
                >
                  Read Here
                </a>
              </h6>
              <Button
                disabled={
                  // fee.total > token1Balance.balance || maxLiquidity < amount
                  new BigNumber(fee.total).gt(new BigNumber(token1Balance.balance))
                  // ||
                  // new BigNumber(maxLiquidity).lt(new BigNumber(amount))
                }
                className="transaction-dollarmodal-btn"
                onClick={confirmHandler}
              >
                {new BigNumber(fee.total).gt(new BigNumber(token1Balance.balance))
                  ? `Not enough balance for fees`
                  : `Confirm Transaction`}
              </Button>
            </Modal.Body>
          </>
        )
      case 'success':
        return (
          <>
            <Modal.Header className="modal-header-custom" closeButton>
              <Modal.Title className="model-title-custom"></Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal-body">
              <div className="modal-body-info">
                <div className="pb-1 pt-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2a6def"
                    style={{
                      strokeWidth: '0.5',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    }}
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="16 12 12 8 8 12"></polyline>
                    <line x1="12" y1="16" x2="12" y2="8"></line>
                  </svg>
                </div>

                <div className="transaction-details">
                  <div className=" transaction-status ">Transaction Submitted</div>
                  <a target="_blank" rel="noopener noreferrer" href={hash}>
                    <div className="etherscan-link">View on Explorer</div>
                  </a>
                </div>
                <button className="custom-transaction-btn btn mt-4" onClick={props.close} type="button">
                  Close
                </button>
              </div>
            </Modal.Body>
          </>
        )
      case 'loading':
        return (
          <>
            <Modal.Header className="modal-header-custom" closeButton>
              <Modal.Title className="model-title-custom"></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-body-info">
                <div
                  style={{
                    margin: ' 25px 0',
                  }}
                >
                  <Loader
                    type="Puff"
                    color={`${data.theme === 'dark' ? '#3E9498' : '#3E9498'}`}
                    height={100}
                    width={100}
                  />
                </div>
                <h4 className="mt-4">Waiting For Confirmation</h4>
                <p>Confirm this transaction in your wallet</p>
              </div>
            </Modal.Body>
          </>
        )
      case 'failure':
        return (
          <>
            <Modal.Header className="modal-header-custom" closeButton>
              <Modal.Title className="model-title-custom">Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-body-info">
                <img className="icon" src={Alert} alt="alert icon" width="85" />
                <h5 className="mt-4">Transaction Rejected</h5>
                <button className="btn custom-transaction-btn" onClick={hideHandler} type="button">
                  Close
                </button>
              </div>
            </Modal.Body>
          </>
        )
      case 'completed':
        return (
          <>
            <Modal.Header className="transactioncomp-modal-header" closeButton>
              <Modal.Title className="custom-modal-title">
                <img src={UboostLogo} alt="uboost-logo" className="custom-modal-logo" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="transactioncomp-modal-body">
              <p>{props.successMessage}</p>
              <a
                style={{ textDecoration: 'none' }}
                className="custom-viewexplorer-link"
                target="_blank"
                rel="noopener noreferrer"
                href={hash}
              >
                <div className="transaction-modal-btn">View on Explorer</div>
              </a>
            </Modal.Body>
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <div>
      <Modal className={`${data.theme}`} onHide={hideHandler} centered {...props}>
        {transactionMethods()}
      </Modal>
    </div>
  )
}
export default TransactionLoaderModal
