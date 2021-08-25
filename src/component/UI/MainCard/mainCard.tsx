import { FC, useContext } from 'react'
import { Card } from 'react-bootstrap'
import SelectCoin from './selectCoin'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import SelectDex from './selectDex'
import TransactionCard from './transactionCard'
const MainCard: FC = () => {
  const { networkError } = useContext(WalletContext)

  return (
    <>
      <div>
        <Card className={`paper`}>
          <div className={`network-message`}>{networkError}</div>
          <Card.Body className={`custom-card-body`}>
            <Card className={`custom-card`}>
              <Card.Body className={`liq-body`}>
                <SelectDex />
              </Card.Body>
            </Card>
            <Card className={`custom-card`}>
              <Card.Body className={`liq-body`}>
                <SelectCoin />
              </Card.Body>
            </Card>
            <Card className={`custom-card`}>
              <Card.Body className={`liq-body`}>
                <TransactionCard />
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default MainCard
