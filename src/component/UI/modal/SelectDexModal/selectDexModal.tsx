import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'context/themeContext'
import { CantFind } from 'Helpers/assets'
import { Modal, Row, FormControl } from 'react-bootstrap'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import '../../../../theme.scss'
import './dexModel.scss'
import { searchWord } from 'Helpers'
import { DexType, ThemeState } from 'utils/types'
import { useCurrentChainSwap } from 'hooks/useCurrentNetworkSwap'
import { WalletContext } from 'context/connectWallet/connectWalletContext'
import { useHistory } from 'react-router-dom'

const SelectDexModal = (props) => {
  const data: ThemeState = useContext(ThemeContext)
  const { setDex, setQpTokens } = useContext(WalletContext)
  const [searchDex, setSearchDex] = useState('')
  const [filteredList, setFilteredList] = useState<any>()
  const swapList = useCurrentChainSwap()
  const history = useHistory()

  useEffect(() => {
    if (searchDex.trim().length > 0) {
      let filtered: DexType[] = swapList.filter((e: DexType) => {
        return searchWord(e.name, searchDex)
      })
      setFilteredList(filtered)
    } else {
      setFilteredList(swapList)
    }
  }, [searchDex, swapList])

  return (
    <div>
      <Modal
        className={`${data.theme}`}
        onHide={() => {
          props.hideHandler()
          setFilteredList(swapList)
        }}
        {...props}
        centered
      >
        <Modal.Header className="custom-coin-modal" style={{ borderBottom: '0' }}>
          <FormControl
            className="custom-search"
            type="text"
            placeholder="Search Dex"
            onChange={(event) => {
              setSearchDex(event.target.value)
            }}
          />
        </Modal.Header>
        <Modal.Body className="custom-row-body">
          <Row className="custom-row">
            {filteredList &&
              filteredList.map((list) => (
                <div
                  key={list.id}
                  className="list-col"
                  onClick={() => {
                    history.push('/')
                    setQpTokens({})
                    setDex(list)
                    props.hideHandler()
                    setSearchDex('')
                  }}
                >
                  <img className="dex-logo" alt="Logo" src={list.logoURI ?? CantFind} />
                  {list.name}
                </div>
              ))}
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default SelectDexModal
