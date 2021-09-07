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
import { UboostLogo } from 'Helpers/assets'

const NavBar = () => {
  const data = useContext<ThemeState>(ThemeContext)
  const { connectedAccount, selectedChain, isConnecting, isConnected } = useContext(WalletContext)
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [selectChainModalShow, setSelectChainModalShow] = useState<boolean>(false)

  return (
    <div>
      <div className="custom-container">
        <div className="row gx-0 gy-0">
          <Navbar className="custom-Navbar" collapseOnSelect expand="lg">
            <Col xs={6} sm={6} md={4} lg={4}>
              <Navbar.Brand className="custom-header" href="#home">
                <img alt="Logo" src={UboostLogo} className="header-logo" />
                {/* <span className="header-title">Uboost</span> */}
              </Navbar.Brand>
            </Col>

            <Col xs={6} sm={6} md={8} lg={8}>
              <Nav className="custom-navLink">
                <Button
                  className="header-btn"
                  onClick={() => {
//                     setSelectChainModalShow(true)
                  }}
                >
                  {selectedChain.name ?? 'Select Chain'}
                </Button>
                {isConnected && connectedAccount ? (
                  <Button className="header-btn mobileview-hidden" onClick={() => setModalShow(true)}>
                    {shortenAddress(connectedAccount)}
                  </Button>
                ) : (
                  <Button className="header-connect-btn mobileview-hidden" onClick={() => setModalShow(true)}>
                    {isConnecting ? 'loading' : 'Connect wallet'}
                  </Button>
                )}
                <div className="mobileview-hidden">
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
                </div>
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

export default NavBar
