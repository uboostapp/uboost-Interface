import React, { useContext, useState } from 'react'
import Switch from 'react-switch'
import { Navbar, Nav, Button, Col } from 'react-bootstrap'
import './index.scss'
import { ThemeContext } from 'context/themeContext'
import ConnectWalletModal from 'component/UI/modal/ConnectWalletModel/connectWalletModal'
import SelectChainModal from 'component/UI/modal/SelectChainModel/selectChainModal'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { shortenAddress } from 'Helpers'

import AccountModal from 'component/UI/modal/AccountModel/AccountModel'
import { ThemeState } from 'utils/types'

const FooterNav = () => {
  const data = useContext<ThemeState>(ThemeContext)
  const { connectedAccount, isConnecting, isConnected } = useContext(WalletContext)
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [selectChainModalShow, setSelectChainModalShow] = useState<boolean>(false)

  return (
    <div>
      <div className="footer-custom-container">
        <div className="row gx-0 gy-0">
          <Navbar className="custom-Navbar" collapseOnSelect expand="lg">
            <Col xs={12} sm={12} md={12} lg={12}>
              <Nav className="footer-custom-navLink">
                <div>
                  {/* <Button className="header-btn" onClick={() => setSelectChainModalShow(true)}>
                    {selectedChain ? selectedChain.name : 'Select Chain'}
                  </Button> */}
                  {isConnected && connectedAccount ? (
                    <Button className="header-btn" onClick={() => setModalShow(true)}>
                      {shortenAddress(connectedAccount)}
                    </Button>
                  ) : (
                    <Button className="header-connect-btn" onClick={() => setModalShow(true)}>
                      {isConnecting ? 'loading' : 'Connect wallet'}
                    </Button>
                  )}
                </div>
                <Switch
                  checked={data.theme === 'light' ?? false}
                  onChange={data.handleToggleTheme}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#fff"
                  offColor="#215355"
                  onHandleColor="#FED330"
                  offHandleColor="#071F21"
                  height={30}
                  width={55}
                  className="switch"
                />
              </Nav>
            </Col>
          </Navbar>
        </div>

        {isConnected && connectedAccount ? (
          <AccountModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            address={connectedAccount}
            disconnectHandler={() => {
              setModalShow(false)
            }}
          />
        ) : (
          <ConnectWalletModal show={modalShow} onHide={() => setModalShow(false)} />
        )}

        <SelectChainModal show={selectChainModalShow} onHide={() => setSelectChainModalShow(false)} />
      </div>
    </div>
  )
}

export default FooterNav
