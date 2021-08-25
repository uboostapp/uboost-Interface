/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from 'context/themeContext'
import { Modal, FormControl } from 'react-bootstrap'
import { searchWord } from 'Helpers'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { ThemeState } from 'utils/types'
import { useCurrentNetworkCoin } from 'hooks/useCurrentNetworkCoins'
import { ImportSection } from './common/import'
import { Token } from './common/token'
import './coinModel.scss'
import { poolExist } from 'ethereum/contracts/coreLB'

const SelectCoinModal = (props) => {
  const data: ThemeState = useContext(ThemeContext)
  const { searchToken, selectedNetwork, searchedToken, tokenImportHandler, walletProvider, token1, token2 } =
    useContext(WalletContext)
  const [isPoolExist, togglePoolExist] = useState<boolean>(true)

  const [searchCoin, setSearchCoin] = useState('')
  const [filteredList, setFilteredList] = useState<any>()
  const currentNetworkCoins = useCurrentNetworkCoin()

  useEffect(() => {
    if (searchCoin.trim().length > 0) {
      let filtered: any =
        currentNetworkCoins &&
        currentNetworkCoins.filter((e: any) => {
          return searchWord(e.name, searchCoin) || searchWord(e.symbol, searchCoin) || searchWord(e.address, searchCoin)
        })
      if (filtered.length === 0) {
        searchToken(searchCoin)
        setFilteredList([])
      } else {
        setFilteredList(filtered)
      }
    } else {
      modalReset()
      setFilteredList(currentNetworkCoins)
    }
  }, [searchCoin, currentNetworkCoins])

  useEffect(() => {
    if (searchedToken && selectedNetwork) {
      poolExist(walletProvider.currentProvider, searchedToken.address).then((res) => {
        togglePoolExist(res)
      })
    }
  }, [searchedToken, walletProvider, selectedNetwork, token1])

  const handleSetSearchCoin = (event) => {
    setSearchCoin(event?.target.value)
  }

  const modalReset = () => {
    searchToken()
    setSearchCoin('')
  }

  return (
    <div>
      <Modal
        size="xl"
        className={`modal-coin-${data.theme}`}
        onHide={() => {
          props.hideHandler()
          setFilteredList(currentNetworkCoins)
          modalReset()
        }}
        show={props.show}
        centered
      >
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>
            <FormControl
              className="custom-coin-search"
              type="text"
              placeholder="Search by name or address"
              value={searchCoin}
              onChange={(event) => handleSetSearchCoin(event)}
            />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="custom-coin-body">
          <div className="token-list">
            {filteredList &&
              filteredList.map((list) => (
                <Token
                  key={list.address}
                  token={list}
                  tokenSelect={(e) => {
                    e.stopPropagation()
                    if (token2 && list.address.toLowerCase() === token2.address.toLowerCase()) {
                      console.log('disabled')
                    } else {
                      props.handleToken1Change(list.address)
                      setSearchCoin('')
                    }
                  }}
                  deleteHandler={(e) => {
                    e.stopPropagation()
                    tokenImportHandler(list, 'delete')
                  }}
                />
              ))}
          </div>

          {searchedToken && (
            <ImportSection
              isPoolExist={isPoolExist}
              searchedToken={searchedToken}
              onImport={() => {
                tokenImportHandler(searchedToken, 'add')
                // props.hideHandler()
                // setFilteredList(allCoinList)
                modalReset()
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default SelectCoinModal
