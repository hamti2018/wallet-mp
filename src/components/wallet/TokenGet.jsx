import cross from '../../images/cross.svg'

const TokenGet = ({ tokenGet, setTokenGet, header, address }) => {
  return (
    <div onClick={() => setTokenGet(false)} className={tokenGet ? 'token-card__hidden token-card__hidden_active' : 'token-card__hidden'} >
      <div onClick={(e) => e.stopPropagation()} className="token-modal token-card__token-modal">
        <div onClick={() => setTokenGet(false)} className="exit token-modal__exit">
          <img className="exit__cross" src={cross} alt="" />
        </div>
        <div className="token-modal__header">Получить {header}</div>
        <div className="token-modal__container">
          <div className="token-modal__info">
            <span className="token-modal__text">Адрес кошелька:</span>
            <span className="token-modal__address">{address}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { TokenGet }
