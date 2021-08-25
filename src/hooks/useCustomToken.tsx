/* eslint-disable react-hooks/exhaustive-deps */
import { tokenList } from 'common'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import _ from 'lodash'

export function useCustomToken() {
  const [coinList, setCoinList] = useState<any>([])

  const [allCoinList, setAllCoinList] = useState<any>(() => {
    let _cache = Cookies.getJSON('customTokens')
    return _cache ? [..._cache, coinList] : coinList
  })

  const [customTokensList, setCustomTokensList] = useState<any>(() => {
    let _Listcache = Cookies.getJSON('customTokens')
    return _Listcache ? [..._Listcache] : []
  })

  const [allCoinList2, setAllCoinList2] = useState<any>(() => {
    let _cache = Cookies.getJSON('customTokens2')
    return _cache ? [..._cache, tokenList] : tokenList
  })

  const [customTokensList2, setCustomTokensList2] = useState<any>(() => {
    let _Listcache = Cookies.getJSON('customTokens2')
    return _Listcache ? [..._Listcache] : []
  })

  const fetchCoinListData = async () => {
    const response = await axios('https://unilend.finance/list.json')
    setCoinList(response.data.tokens)
  }
  useEffect(() => {
    fetchCoinListData()
  }, [])
  useEffect(() => {
    setAllCoinList([...coinList, ...customTokensList])
  }, [coinList, customTokensList])

  useEffect(() => {
    setAllCoinList2([...tokenList, ...customTokensList2])
  }, [tokenList, customTokensList2])

  const tokenImportHandler = (token: any, type: string) => {
    if (type === 'add') {
      let list = [...allCoinList, token]
      let customList = [...customTokensList, token]
      setCustomTokensList(customList)
      setAllCoinList(list)
      Cookies.set('customTokens', customList)
    } else {
      let newList = _.remove([...allCoinList], (item) => {
        return token.address !== item.address
      })
      let newCustomList = _.remove([...customTokensList], (item) => {
        return token.address !== item.address
      })
      setAllCoinList(newList)
      setCustomTokensList(newCustomList)
      Cookies.set('customTokens', newCustomList)
    }
  }

  const token2ImportHandler = (token: any, type: string) => {
    if (type === 'add') {
      let list = [...allCoinList2, token]
      let customList2 = [...customTokensList2, token]
      setCustomTokensList2(customList2)
      setAllCoinList2(list)
      Cookies.set('customTokens2', customList2)
    } else {
      let newList2 = _.remove([...allCoinList2], (item) => {
        return token.id !== item.id
      })
      let newCustomList2 = _.remove([...customTokensList2], (item) => {
        return token.id !== item.id
      })
      setAllCoinList2(newList2)
      setCustomTokensList2(newCustomList2)
      Cookies.set('customTokens2', newCustomList2)
    }
  }

  return { allCoinList, allCoinList2, tokenImportHandler, token2ImportHandler }
}
