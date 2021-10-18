import React, { useState, useEffect } from "react";
import { TokenCard } from "./TokenCard";
import { SendToPool } from "./SendToPool";
import toast, { Toaster } from 'react-hot-toast';

import "./Wallet.css"
import { withRouter } from "react-router-dom";

const Wallet = ({history}) => {
    const [message, setMessage] = useState("")           //При каждом изменении message появляется сообщение об ошибке
    const [poolCard, setPoolCard] = useState(false)
    useEffect(() => {
        if (message !== "") {
            toast.error(message, {
                style: {
                    fontSize: "14px",
                    fontWeight: "700",
                    padding: '16px',
                    color: 'black',
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
                    localStorage.removeItem("sc")
                    history.push("/login")
                }}
                className="wallet__exit">
                    Выход
                </button>
                <div className="wallet__cards">
                    <TokenCard
                        name={"MINE"}
                        balance={"1212"}
                        link={"mp1Nye27Xwm2nXvg4n1ucUmyjrm49UsnrUP8"}
                    />
                    <TokenCard
                        name={"PLEX"}
                        balance={"121"}
                        link={"mp1Nye27Xwm2nXvg4n1ucUmyjrm49UsnrUP8"}
                    />
                </div>
                <button onClick={() => setPoolCard(!poolCard)} className="wallet__button">Отправить в Pool</button>
            </div>
        </div>
    )
}

let WalletPage=withRouter(Wallet);

export default WalletPage;