import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'

import './index.scss'
import { ThemeContext } from 'context/themeContext'
import { ThemeState } from 'utils/types'
import { MedianDark, MedianLight, TwitterDark, TwitterLight } from 'Helpers/assets'

const Footer = () => {
  const data: ThemeState = useContext(ThemeContext)

  return (
    <div className="footer-container">
      <Row className="custom-footer-row">
        <Col xs={12} sm={6} md={6} className="footer-links">
          {/* <p className="footer-nav-auto">Docs</p> */}
          <p className="footer-nav-auto">
            <a href="mailto: uboost.defi@gmail.com">Contact Us</a>
          </p>
        </Col>

        <Col xs={12} sm={6} md={6} className="footer-social-media">
          <a href="https://uboost-app.medium.com/" rel="noreferrer" target="_blank">
            <img alt="Logo" src={data.theme === 'light' ? MedianLight : MedianDark} className="footer-logo" />
          </a>
          <a href="https://twitter.com/uBoostApp" rel="noreferrer" target="_blank">
            <img alt="Logo" src={data.theme === 'light' ? TwitterLight : TwitterDark} className="footer-logo" />
          </a>
        </Col>
      </Row>
    </div>
  )
}

export default Footer
