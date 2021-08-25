import React, { useContext } from 'react'
import { ThemeContext } from 'context/themeContext'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { Modal, Container, Card } from 'react-bootstrap'
import '../index.scss'
import './accountModel.scss'
import { shortenAddress, copyToClipboard } from 'Helpers'
import { ThemeState } from 'utils/types'
import UseExplorer from 'hooks/useExplorer'

const AccountModal = (props) => {
  const data: ThemeState = useContext(ThemeContext)
  const { disconnectHandler } = useContext(WalletContext)
  const explorerUri = UseExplorer(props.address)

  return (
    <div>
      <Modal className={`${data.theme}`} {...props} centered size="md">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body className="account-modal-body">
          <Container>
            <Card className="custom-card-address">
              <Card.Title className="custom-card-title">
                <p className="card-title-header">Connected with metamask</p>
                <button
                  className="custom-card-title-btn"
                  onClick={() => {
                    props.disconnectHandler()
                    disconnectHandler()
                  }}
                >
                  Disconnect
                </button>
              </Card.Title>
              <Card.Body className="custom-card-body">
                <p>{shortenAddress(props.address)}</p>
                <div className="custom-cardbody-content">
                  <Card.Link className="custom-copyaddress-link" onClick={() => copyToClipboard(props.address)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      style={{
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '2',
                      }}
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>{' '}
                    Copy address
                  </Card.Link>
                  <Card.Link className="custom-explorer-link" target="_blank" href={explorerUri}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      style={{
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '2',
                      }}
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>{' '}
                    Link to explorer
                  </Card.Link>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default AccountModal
