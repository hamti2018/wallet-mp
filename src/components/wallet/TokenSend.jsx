import { useState, useEffect } from 'react'
import toast/* , { Toaster } */ from 'react-hot-toast'
import CryptoJS from 'crypto-js'

import mpapi from '../../mpapi'
import cross from '../../images/cross.svg'

const TokenSend = ({ header, sum, tokenSend, setTokenSend }) => {
  const [inputValue, setInputValue] = useState('')
  const [valueError, setValueError] = useState(false)
  const [valueFocus, setValueFocus] = useState(false)
  const [valueMessage, setValueMessage] = useState('Недопустимое значение!')
  const [inputAddress, setInputAddress] = useState('')
  const [addressError, setAddressError] = useState(false)
  const [addressFocus, setAddressFocus] = useState(false)
  const [inputPassword, setInputPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  useEffect(() => {
    passwordValidation(inputPassword)
    addressValidation(inputAddress)
    valueValidation(inputValue)
  })

  async function send(inputValue, inputAddress, inputPassword) {
    let sk
    const encryptedSc = localStorage.getItem('sk')
    const decryptedSc = CryptoJS.AES.decrypt(encryptedSc, inputPassword)
    const pkh = localStorage.getItem('pkh')
    const pk = localStorage.getItem('pk')
    try {
      sk = decryptedSc.toString(CryptoJS.enc.Utf8)
    } catch (e) {
      console.log(e)
    }

    if (header === 'MINE') {
      await toast.promise(mpapi.rpc.mine_transfer(pkh, { sk, pkh, pk }, inputAddress, +inputValue, 1), {
        loading: 'Подождите...',
        error: 'Ошибка при провередение транзакции... Попробуйте еще раз.',
        success: 'Транзакция успешно. Фактически перевод может идти от 2х до 20ти минут',
        style: {
          fontSize: '14px',
          fontWeight: '700',
          padding: '16px',
          color: 'black'
        }
      })
    } else if (header === 'PLEX') {
      await toast.promise(mpapi.rpc.plex_transfer(pkh, { sk, pkh, pk }, inputAddress, +inputValue, 1), {
        loading: 'Подождите...',
        error: 'Ошибка при провередение транзакции... Попробуйте еще раз.',
        success: 'Транзакция успешно. Фактически перевод может идти от 2х до 20ти минут',
        style: {
          fontSize: '14px',
          fontWeight: '700',
          padding: '16px',
          color: 'black'
        }
      })
    }
  }

  function valueValidation(value) {
    value = value.toString().replace(',', '.')
    const valueСheck = (/^\d{1,100}(\.\d{1,100})?$/).test(value)
    if (valueСheck) {
      if (parseFloat(value) < 1) {
        setValueError(true)
        setValueMessage('Число не должно быть меньше 1')
      } else {
        setValueError(false)
      }
    } else {
      if (valueFocus) {
        setValueError(true)
        setValueMessage('Недопустимое значение!')
      } else {
        setValueError(false)
      }
    }
  }

  function addressValidation(address) {
    if (address.slice(0, 3) === 'mp1') {
      setAddressError(false)
    } else {
      if (addressFocus) {
        setAddressError(true)
      } else {
        setAddressError(false)
      }
    }
  }

  function passwordValidation(password) {
    if (password.length < 8 && passwordFocus) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }

  return (
    <div
      onClick={() => {
        setTokenSend(false)
        setInputValue('')
        setValueFocus(false)
        setInputAddress('')
        setAddressFocus(false)
        setInputPassword('')
        setPasswordFocus(false)
      }}
      className={tokenSend ? 'token-card__hidden token-card__hidden_active' : 'token-card__hidden'}>
      {/* <Toaster /> */}
      <div onClick={(e) => e.stopPropagation()} className="token-modal token-card__token-modal">
        <div
          onClick={() => {
            setTokenSend(false)
            setInputValue('')
            setValueFocus(false)
            setInputAddress('')
            setAddressFocus(false)
            setInputPassword('')
            setPasswordFocus(false)
          }}
          className="exit token-modal__exit">
          <img className="exit__cross" src={cross} alt="" />
        </div>
        <div className="token-modal__header">Отправить {header}</div>
        <div className="token-modal__body">
          <div className="token-modal__inputs">
            <div className="token-modal__input">
              <span className="token-modal__text">Количество {header}</span>
              <input
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value) }}
                onFocus={() => { setValueFocus(true) }}
                className={!valueError ? 'token-modal__getter' : 'token-modal__getter token-modal__getter_error'}
              />
              <button onClick={() => {
                console.log(sum)
                setInputValue(sum)
              }} className="token-modal__increase">MAX</button>
              <div className={!valueError ? 'none-display' : 'token-modal__text token-modal__error'}>{valueMessage}</div>
            </div>
            <div className="token-modal__input token-modal__input_long">
              <span className="token-modal__text">Адрес кошелька:</span>
              <input
                value={inputAddress}
                onInput={(e) => { setInputAddress(e.target.value) }}
                onFocus={() => { setAddressFocus(true) }}
                className={!addressError ? 'token-modal__getter' : 'token-modal__getter token-modal__getter_error'}
              />
              <div className={!addressError ? 'none-display' : 'token-modal__text token-modal__error'}>Адрес должен начинаться с mp1</div>
            </div>
            <div className="token-modal__input token-modal__input_long">
              <span className="token-modal__text">Введите пароль</span>
              <input
                value={inputPassword}
                onChange={(e) => { setInputPassword(e.target.value) }}
                onFocus={() => { setPasswordFocus(true) }}
                className={!passwordError ? 'token-modal__getter' : 'token-modal__getter token-modal__getter_error'}
              />
              <div className={!passwordError ? 'none-display' : 'token-modal__text token-modal__error'}>Минимальная длина пароля - 8 символов</div>
            </div>
          </div>
          <button
            onClick={async () => {
              if (!addressError && !valueError && !passwordError && addressFocus && valueFocus && passwordFocus) {
                await send(inputValue, inputAddress, inputPassword)
                setTokenSend(false)
                setInputValue('')
                setValueFocus(false)
                setInputAddress('')
                setAddressFocus(false)
                setInputPassword('')
                setPasswordFocus(false)
              } else {
                setAddressFocus(true)
                setValueFocus(true)
                setPasswordFocus(true)
              }
            }}
            className="token-modal__button">
            Отправить
          </button>
        </div>
      </div>
    </div >
  )
}

export { TokenSend }
