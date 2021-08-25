import { FC, useContext, useState } from 'react'
import { Button } from 'react-bootstrap'

import { SettingIcon, SettingIconDark, unilendLogo, CantFind } from 'Helpers/assets'
import SelectDexModal from '../modal/SelectDexModal/selectDexModal'
import { ThemeState } from 'utils/types'
import DeflationaryModel from '../modal/DeflationaryModel/deflationaryModel'

import { ThemeContext } from 'context/themeContext'
import { WalletContext } from 'context/connectWallet/connectWalletContext'

import '../modal/SelectDexModal/dexModel.scss'

const SelectDex: FC = () => {
  const data: ThemeState = useContext(ThemeContext)
  const { selectedDex } = useContext(WalletContext)
  const [dexModalShow, setDexModalShow] = useState(false)
  const [deflationaryModel, setDeflationaryModel] = useState(false)
  function addDefaultSrc(ev) {
    ev.target.src = CantFind
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Settings = (
    <div className={`settings`}>
      <img
        src={data.theme === 'dark' ? SettingIconDark : SettingIcon}
        alt=""
        onClick={() => setDeflationaryModel(true)}
      />
    </div>
  )

  const DexButton = ({ handleClick, token, disabled }) => (
    <div className={`selectDex`}>
      <Button className="switch-btn selected">
        <img src={unilendLogo} alt="" />
        Unilend
      </Button>
      <div style={{ minWidth: '10px' }}></div>
      <Button className="switch-btn" onClick={() => handleClick(true)} disabled={disabled}>
        {token ? (
          <span>
            <img alt="Logo" src={token.logoURI ?? CantFind} onError={addDefaultSrc} className="custom-selectdex-logo" />
            {token.name}{' '}
          </span>
        ) : (
          'Select DEX'
        )}
      </Button>
    </div>
  )

  return (
    <>
      {/* {Settings} */}
      <DexButton handleClick={() => setDexModalShow(true)} token={selectedDex} disabled={false} />
      <SelectDexModal show={dexModalShow} hideHandler={() => setDexModalShow(false)} />
      <DeflationaryModel show={deflationaryModel} onHide={() => setDeflationaryModel(false)} />
    </>
  )
}

export default SelectDex
