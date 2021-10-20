import { useState } from 'react'
import { TokenGet } from './TokenGet'
import { TokenSend } from './TokenSend'

const TokenCard = ({ name, balance, link }) => {
  const [tokenSend, setTokenSend] = useState(false)
  const [tokenGet, setTokenGet] = useState(false)
  return (
    <div className="token-card">
      <TokenGet
        tokenGet={tokenGet}
        setTokenGet={setTokenGet}
        header={name}
        address={link}
      />
      <TokenSend
        header={name}
        sum={balance}
        tokenSend={tokenSend}
        setTokenSend={setTokenSend}
      />
      <div className="token-card__container">
        <div className="token-card__text">Баланс {name}:</div>
        <div className="token-card__sum">{balance} <span className="token-card__token-name">{name}</span></div>
        <div className="token-card__link">
          <span className="token-card__text">Адрес кошелька</span>
          <div className="token-card__address">{link}</div>
        </div>
        <div className="token-card__actions">
          <button onClick={() => setTokenSend(true)} className="token-card__button">Отправить</button>
          <button onClick={() => setTokenGet(true)} className="token-card__button">Получить</button>
        </div>

      </div>
    </div>
  )
}

export { TokenCard }
