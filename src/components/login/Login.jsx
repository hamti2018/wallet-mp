import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { AES } from 'crypto-js'
import mpapi from '../../mpapi'

import './Login.css'

const Login = ({ history }) => {
  const [secretkey, setSecretkey] = useState('')
  const [secretkeyFocus, setSecretkeyFocus] = useState(false)
  const [secretkeyError, setSecretkeyError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  function login (secretkey, password) {
    let sk
    let pkh
    if (mpapi.crypto.validateMnemonic(secretkey)) {
      const keys = mpapi.crypto.generateKeys(secretkey)
      sk = keys.sk
      pkh = keys.pkh
    } else if (mpapi.crypto.extractKeys(secretkey)) {
      const keys = mpapi.crypto.extractKeys(secretkey)
      sk = keys.sk
      pkh = keys.pkh
    } else {
      return false
    }
    localStorage.setItem('pkh', pkh)
    localStorage.setItem('sk', AES.encrypt(sk, password))
    history.push('/wallet')
  }

  useEffect(() => {
    keyValidation(secretkey)
    passwordValidation(password)
  })

  function keyValidation (secretkey) {
    if (secretkey.length < 15 && secretkeyFocus) {
      setSecretkeyError(true)
    } else {
      setSecretkeyError(false)
    }
  }

  function passwordValidation (password) {
    if (password.length < 8 && passwordFocus) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }

  return (
        <div className="wrapper">
            <div className="login">
                <div className="login__container">
                    <div className="login__header">ВХОД</div>
                    <div className="login__getter">
                        <div className="login__key login__input-block">
                            <div className="login__text">Введите SEED-фразу или Секретный ключ</div>
                            <input
                                onChange={e => { setSecretkey(e.target.value) }}
                                onFocus={() => { setSecretkeyFocus(true) }}
                                value={secretkey}
                                type="text"
                                className={!secretkeyError ? 'login__input' : 'login__input login__input_error'}
                                placeholder="SEED-фраза или Секретный ключ"
                            />
                            <div className={!secretkeyError ? 'none-display' : 'login__text login__error'}>Минимальная длина SEED-фразы или Секретного ключа - 15 символов</div>
                        </div>
                        <div className="login__password login__input-block">
                            <div className="login__text">Введите пароль для шифровки секретного ключа</div>
                            <input
                                onChange={e => { setPassword(e.target.value) }}
                                onFocus={() => { setPasswordFocus(true) }}
                                value={password}
                                type="text"
                                className={!passwordError ? 'login__input' : 'login__input login__input_error'}
                                placeholder="Пароль"
                            />
                            <div className={!passwordError ? 'none-display' : 'login__text login__error'}>Минимальная длина пароля - 8 символов</div>
                        </div>
                        <div className="login__enter">
                            <button
                                onClick={() => {
                                  if (!passwordError && !secretkeyError && passwordFocus && secretkeyFocus) {
                                    login(secretkey, password)
                                  } else {
                                    setPasswordFocus(true)
                                    setSecretkeyFocus(true)
                                  }
                                }}
                                className="login__button">
                                ВХОД
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
  )
}

const LoginPage = withRouter(Login)

export default LoginPage
