/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { ThemeContext } from 'context/themeContext'
import { useContext } from 'react'
import './transactionCompletedModal.scss'
import '../../../../theme.scss'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { UboostLogo } from 'Helpers/assets'
import { getTransactionHashUrl } from 'Helpers'

const TransactionCompletedModal = (props) => {
  const data: any = useContext(ThemeContext)
  const { resetTransaction, transferHash, selectedNetwork } = useContext(WalletContext)
  const [hash, setHash] = useState<any>()

  const handleClose = () => {
    props.close()
    resetTransaction()
  }

  useEffect(() => {
    setHash(getTransactionHashUrl(selectedNetwork.name.toLowerCase(), transferHash))
  }, [transferHash])

  return (
    <>
      <Modal className={`${data.theme}`} onHide={handleClose} {...props} centered size="md">
        <Modal.Header className="transactioncomp-modal-header" closeButton>
          <Modal.Title className="custom-modal-title">
            <img src={UboostLogo} alt="uboost-logo" className="custom-modal-logo" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="transactioncomp-modal-body">
          <p>{props.successMessage}</p>
          <a style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer" href={hash}>
            <div className="transaction-modal-btn">View on Explorer</div>
          </a>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default TransactionCompletedModal
