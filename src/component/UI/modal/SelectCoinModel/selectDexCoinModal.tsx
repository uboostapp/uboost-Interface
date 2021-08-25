/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from 'context/themeContext'
import { Modal, FormControl } from 'react-bootstrap'
import { searchWord } from 'Helpers'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { ThemeState } from 'utils/types'
import { useCurrentNetworkToken } from 'hooks/useCurrentNetworkToken'
import { ImportSection } from './common/import'
import { Token } from './common/token'

import './coinModel.scss'
import { getTokenLiquidity } from 'Helpers/liquidityService'

const SelectDexModal = (props) => {
  const data: ThemeState = useContext(ThemeContext)
  const { searchToken2, selectedDex, searchedToken, token2ImportHandler, token1, token2, setMaxLiquidity } =
    useContext(WalletContext)
  const [isLiquidityExist, toggleLiquidityExist] = useState<boolean>(true)

  const [searchCoin, setSearchCoin] = useState('')
  const [filteredList, setFilteredList] = useState<any>()
  const currentNetworkToken = useCurrentNetworkToken()

  useEffect(() => {
    if (searchCoin.trim().length > 0) {
      let filtered: any =
        currentNetworkToken &&
        currentNetworkToken.filter((e: any) => {
          return searchWord(e.name, searchCoin) || searchWord(e.symbol, searchCoin) || searchWord(e.address, searchCoin)
        })
      if (filtered.length === 0) {
        searchToken2(searchCoin)
        setFilteredList([])
      } else {
        setFilteredList(filtered)
      }
    } else {
      modalReset()
      setFilteredList(currentNetworkToken)
    }
  }, [searchCoin, currentNetworkToken])
  useEffect(() => {
    if (selectedDex && token2.address) {
      getTokenLiquidity(selectedDex.id, token2.address)
        .then((res) => {
          if (res?.tokens[0]?.totalLiquidity > 0) {
            setMaxLiquidity(res.tokens[0].totalLiquidity)
          } else setMaxLiquidity('0')
        })
        .catch((e) => {
          setMaxLiquidity('0')
        })
    }
  }, [token2, selectedDex])

  useEffect(() => {
    if (searchedToken && selectedDex) {
      getTokenLiquidity(selectedDex.id, searchCoin)
        .then((res) => {
          if (res?.tokens[0]?.totalLiquidity > 0) {
            setMaxLiquidity(res.tokens.totalLiquidity)
            toggleLiquidityExist(true)
          } else toggleLiquidityExist(false)
        })
        .catch((e) => {
          toggleLiquidityExist(false)
        })
    }
  }, [selectedDex, searchedToken])

  const handleSetSearchCoin = (event) => {
    setSearchCoin(event?.target.value)
  }

  const modalReset = () => {
    searchToken2()
    setSearchCoin('')
  }

  return (
    <div>
      <Modal
        size="xl"
        className={`modal-coin-${data.theme}`}
        onHide={() => {
          props.hideHandler()
          setFilteredList(currentNetworkToken)
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
                    if (token1 && list.address.toLowerCase() === token1.address.toLowerCase()) {
                      console.log('disabled')
                    } else {
                      props.handleToken2Change(list.address)
                      setSearchCoin('')
                    }
                  }}
                  deleteHandler={(e) => {
                    e.stopPropagation()
                    token2ImportHandler(list, 'delete')
                  }}
                />
              ))}
          </div>

          {searchedToken && (
            <ImportSection
              isPoolExist={isLiquidityExist}
              searchedToken={searchedToken}
              onImport={() => {
                token2ImportHandler(searchedToken, 'add')
                // props.hideHandler()
                // setFilteredList(allCoinList2)
                modalReset()
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default SelectDexModal
