import React, { useContext } from 'react'
import { ThemeContext } from 'context/themeContext'
import { Modal, Button } from 'react-bootstrap'
import '../index.scss'
import '../../../../theme.scss'
import { walletList } from 'common'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { ThemeState, Wallet } from 'utils/types'

const ConnectWalletModal = (props) => {
  const data: ThemeState = useContext(ThemeContext)
  const { handleConnect, selectedChain } = useContext(WalletContext)
  return (
    <div className={`${data.theme}`}>
      <Modal className={`${data.theme}`} {...props} centered size="md">
      {/* <Modal.Header closeButton className="selectWallet-title" style={{ borderBottom: "0" }}></Modal.Header>*/}
        <Modal.Body className="custom-modalBody">
          {walletList(selectedChain.id).map((wallet: Wallet) => (
            <Button
              key={wallet.id}
              className="custom-modal-btn"
              onClick={() => {
                handleConnect(wallet)
                props.onHide()
              }}
            >
              <img src={wallet.logo} alt="" />
              <div>{wallet.walletName.toUpperCase()}</div>
            </Button>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default ConnectWalletModal
