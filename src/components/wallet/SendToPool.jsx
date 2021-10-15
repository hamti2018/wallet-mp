import React, { useEffect, useState } from "react"
import cross from "../../images/cross.svg"
var CryptoJS = require("crypto-js");

const SendToPool = ({ poolCard, setPoolCard }) => {
    const [inputPassword, setInputPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false)

    useEffect(() => {
        passwordValidation(inputPassword);
    })

    function connect(inputPassword) {
        var encryptedSc = localStorage.getItem('sc');
        var decryptedSc = CryptoJS.AES.decrypt(encryptedSc, inputPassword);
        var sc = decryptedSc.toString(CryptoJS.enc.Utf8);
        alert(sc);
        //sc - секретный ключ пользователя который он расшифровал паролем
        //сюда нужно добавить проверку верно ли расшифрован секретный ключ
    }

    function passwordValidation(password) {
        if (password.length < 8 && passwordFocus) {
            setPasswordError(true)
        }
        else {
            setPasswordError(false)
        }
    }

    return (
        <div
            onClick={() => {
                setPoolCard(false);
                setInputPassword("");
                setPasswordFocus(false);
            }}
            className={poolCard ? "token-card__hidden token-card__hidden_active" : "token-card__hidden"}>
            <div onClick={(e) => { e.stopPropagation(); }} className="token-modal token-card__token-modal">
                <div
                    onClick={() => {
                        setPoolCard(false);
                        setInputPassword("");
                        setPasswordFocus(false);
                    }}
                    className="exit token-modal__exit">
                    <img className="exit__cross" src={cross} alt="" />
                </div>
                <div className="token-modal__header">Отправить в Pool</div>
                <div className="token-modal__body">
                    <div className="token-modal__inputs">
                        <div className="token-modal__about">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere nemo optio sapiente facilis architecto voluptates illum, saepe corrupti quas quasi laboriosam! Et fugiat nobis ullam corrupti dolorum obcaecati, ducimus asperiores?</div>
                        <div className="token-modal__input token-modal__input_long">
                            <span className="token-modal__text">Введите пароль</span>
                            <input
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                                onFocus={() => setPasswordFocus(true)}
                                className={!passwordError ? "token-modal__getter" : "token-modal__getter token-modal__getter_error"}
                            />
                            <div className={!passwordError ? "none-display" : "token-modal__text token-modal__error"}>Минимальная длина пароля - 8 символов</div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            if (!passwordError && passwordFocus) {
                                connect(inputPassword);
                                setPoolCard(false);
                                setInputPassword("");
                                setPasswordFocus(false);
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


export { SendToPool };