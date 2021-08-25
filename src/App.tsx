import BigNumber from 'bignumber.js'
import { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { ThemeContext } from 'context/themeContext'
import Layout from 'component/UI/layout'
import MainCard from 'component/UI/MainCard/mainCard'
import { useLocation, Route } from 'react-router-dom'
import './App.scss'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { ThemeState } from 'utils/types'
import Switch from 'react-bootstrap/esm/Switch'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function App(props) {
  const data: ThemeState = useContext(ThemeContext)
  const { handleConnect, setQpTokens } = useContext(WalletContext)
  const location = useLocation()
  useEffect(() => {
    if (location.search) {
      let search = location.search
      let texts = search.slice(1).split('&')
      let object = {}
      texts.forEach((item) => {
        let sear = item.split('=')
        if ((sear !== '' && sear[0] === 'main_token') || sear[0] === 'base_token' || sear[0] === 'dex')
          object[sear[0]] = sear[1]
      })
      setQpTokens(object)
    } else {
      setQpTokens({})
    }
    let wallet = Cookies.getJSON('wallet')
    if (wallet) {
      handleConnect(wallet)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (qpTokens !== {}) {
  //     history.push('/boost')
  //   }
  // }, [qpTokens, token1, token2, selectedDex])

  return (
    <div className={`App ${data.theme}`}>
      <Layout>
        <Switch>
          {/* <Route path="/boost/:id?" component={MainCard} /> */}
          <Route exact path="/:id?" component={MainCard} />
        </Switch>
      </Layout>
    </div>
  )
}

export default App
