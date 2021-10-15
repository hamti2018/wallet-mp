import React, { useState } from "react";
import { TokenCard } from "./TokenCard";
import { SendToPool } from "./SendToPool";
import "./Wallet.css"

const Wallet = () => {
    const [poolCard, setPoolCard] = useState(false)

    return (
        <div className="wrapper">
            <SendToPool
                poolCard={poolCard}
                setPoolCard={setPoolCard}
            />
            <div className="wallet">
                <div className="wallet__header"> Кошелёк</div>
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

export default Wallet;