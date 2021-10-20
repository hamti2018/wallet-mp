import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CryptoJS from 'crypto-js'
import mpapi from '../../mpapi'
import { BAKER_ADDRESS } from '../../config'
import cross from '../../images/cross.svg'

const SendToPool = ({ poolCard, setPoolCard }) => {
  const [inputPassword, setInputPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  useEffect(() => {
    passwordValidation(inputPassword)
  })

  async function connect(inputPassword) {
    const encryptedSc = localStorage.getItem('sk')
    const decryptedSc = CryptoJS.AES.decrypt(encryptedSc, inputPassword)
    const sk = decryptedSc.toString(CryptoJS.enc.Utf8)
    const pkh = localStorage.getItem('pkh')

    try {
      await mpapi.rpc.setDelegate(pkh, { sk, pkh }, BAKER_ADDRESS, 1)
      toast.success('Успешно делегировано', {
        style: {
          fontSize: '14px',
          fontWeight: '700',
          padding: '16px',
          color: 'black'
        }
      })
    } catch (e) {
      toast.error('Ошибка при делегирование... Попробуйте еще раз.', {
        style: {
          fontSize: '14px',
          fontWeight: '700',
          padding: '16px',
          color: 'black'
        }
      })
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
        setPoolCard(false)
        setInputPassword('')
        setPasswordFocus(false)
      }}
      className={poolCard ? 'token-card__hidden token-card__hidden_active' : 'token-card__hidden'}>
      <div onClick={(e) => { e.stopPropagation() }} className="token-modal token-card__token-modal">
        <div
          onClick={() => {
            setPoolCard(false)
            setInputPassword('')
            setPasswordFocus(false)
          }}
          className="exit token-modal__exit">
          <img className="exit__cross" src={cross} alt="" />
        </div>
        <div className="token-modal__header">Отправить в Pool</div>
        <div className="token-modal__body">
          <div className="token-modal__inputs">
            <div className="token-modal__about">
              {BAKER_ADDRESS}
              </div>
            <div className="token-modal__input token-modal__input_long">
              <span className="token-modal__text">Введите пароль</span>
              <input
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                className={!passwordError ? 'token-modal__getter' : 'token-modal__getter token-modal__getter_error'}
              />
              <div className={!passwordError ? 'none-display' : 'token-modal__text token-modal__error'}>Минимальная длина пароля - 8 символов</div>
            </div>
          </div>
          <button
            onClick={async () => {
              if (!passwordError && passwordFocus) {
                console.log('click')
                await connect(inputPassword)
                console.log('click')
                setPoolCard(false)
                setInputPassword('')
                setPasswordFocus(false)
              } else {
                setPasswordFocus(true)
              }
            }}
            className="token-modal__button">
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}

export { SendToPool }
