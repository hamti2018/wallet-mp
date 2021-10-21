import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { TokenCard } from './TokenCard'
import { SendToPool } from './SendToPool'
import mpapi from '../../mpapi'
import './Wallet.css'

const { utility } = mpapi

const Wallet = ({ history }) => {
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState('')
  const [poolCard, setPoolCard] = useState(false)
  const [mineBalance, setMineBalance] = useState(0)
  const [plexBalance, setPlexBalance] = useState(0)
  const [pkh, setPkh] = useState('Address')

  useEffect(() => {
    async function updateBalance () {
      if (pkh === 'Address') return
      const mineBalance = utility.totez(await mpapi.rpc.getMineBalance(pkh))
      const plexBalance = utility.totez(await mpapi.rpc.getPlexBalance(pkh))
      setMineBalance(mineBalance)
      setPlexBalance(plexBalance)
    }
    const pkh = localStorage.getItem('pkh')
    setPkh(pkh)
    const timer = setInterval(updateBalance, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (message !== '') {
      toast.error(message, {
        position: 'top-center',
        style: {
          fontSize: '14px',
          fontWeight: '700',
          padding: '16px',
          color: 'black'
        },
        duration: 6000
      })
    }
  }, [message])

  return (

        <div className="wrapper">
            <Toaster />
            <SendToPool
                poolCard={poolCard}
                setPoolCard={setPoolCard}
            />
            <div className="wallet">
                <div className="wallet__header"> Кошелёк</div>
                <button
                onClick={() => {
                  localStorage.removeItem('sk')
				  localStorage.removeItem('pkh')
                  history.push('/login')
                }}
                className="wallet__exit">
                    Выход
                </button>
                <div className="wallet__cards">
                    <TokenCard
                        name={'MINE'}
                        balance={mineBalance}
                        link={pkh}
                    />
                    <TokenCard
                        name={'PLEX'}
                        balance={plexBalance}
                        link={pkh}
                    />
                </div>
                <button onClick={() => setPoolCard(!poolCard)} className="wallet__button">Отправить в Pool</button>
            </div>
        </div>
  )
}

const WalletPage = withRouter(Wallet)

export default WalletPage
