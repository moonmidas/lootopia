import React, { useEffect, useState } from 'react'
import useConnectedAddress from '../../hooks/useConnectedAddress'
import { useWallet } from "@terra-money/wallet-provider"
import { useGasPrice } from "../../hooks/useGasPrices"
import { MsgExecuteContract } from "@terra-money/terra.js"
import pacman from '../../assets/pacman.gif'
import { SDOLLAR_CONTRACT } from '../../constants'

export default function MintButton(
    { label, lootFactory, recallData, mintingQuantity, maxMintingQuantity, collection, price, sdollarsBalance, recallSdollarsBalance}) {
    const [ buttonState, setButtonState ] = useState("idle")
    const address = useConnectedAddress()
    const { network, post } = useWallet()
    const gasPrices = useGasPrice("uusd")
    const [mintingMessage, setMintingMessage] = useState("")

  // Minting Quantity and Max Minting Quantity per user
    const [txHash, setTxHash] = useState("")

    useEffect(() => {
        setTxHash("")
        setMintingMessage("")

    }, [collection])


    const mint = async () => {
        let currentButtonState = buttonState;
        let mintResponse;        
        try {
            setButtonState("waiting-auth");
            const msgs = [
                new MsgExecuteContract(
                address,
                SDOLLAR_CONTRACT,
                {
                    "send": {
                    "msg": "eyJidXkiOnt9fQ==",
                    "amount": price,
                    "contract": lootFactory
                    }
                },
                //new Coins([Coin.fromData({ amount: amount1, denom: "uusd" })])
                ),
            ]
            const txOptions = { msgs, gasPrices }
            try { 
                mintResponse = await post(txOptions)
                setButtonState("minting"); 
                /* console.log("Mint Response:");
                console.log(mintResponse)*/

                // time out the function for 10 seconds
                // should probably query the chain to see if the tx is confirmed though, but this might work for a while
                
                setTimeout(() => {
                    setMintingMessage("Minting Successful!");
                    setTxHash("https://finder.extraterrestrial.money/" + network.name + "/tx/" + mintResponse.result.txhash)
                    recallData(true)
                    recallSdollarsBalance(sdollarsBalance-price)
                    if (mintingQuantity+1 >= maxMintingQuantity) {
                        setButtonState('max-minted')
                    } else {
                        setButtonState("mint-more");
                    }
                }, 10000);
            } catch(e) { 
                if (e.name === "UserDenied") { 
                    setMintingMessage("Error minting: You didn't authorized the transaction");
                } else if (e.name === "CreateTxFailed") {
                    setMintingMessage("Error minting: Failed to create transaction (possible causes: lack of funds, all tokens have been minted, or you have reached your mint limit)");
                } else if (e.name === "TxFailed") {
                        setMintingMessage("Error minting: Transaction failed (possible causes: lack of funds, all tokens have been minted, or you have reached your mint limit)");
                } else if (e.name === "Timeout") {
                        setMintingMessage("Error minting: Transaction timed out");
                } else if (e.name === "TxUnspecifiedError") {
                        setMintingMessage("Error minting: Unspecified Error. (Possible causes: lack of funds, all tokens have been minted, or you have reached your mint limit)");
                } else {
                        setMintingMessage("Error minting: Unknown Error. (Possible causes: lack of funds, all tokens have been minted, or you have reached your mint limit)");
                        console.log(e);
                }
                setButtonState(currentButtonState);
                setTxHash("");
            }
        } catch (e) {
            setMintingMessage("Error minting")
            setTxHash("");
            console.log(e.name)
            setButtonState(currentButtonState);
        }
    }
    return (
        <div>
                <>
                    <p></p>
                    {buttonState === "idle" ? 
                        <button className="nes-btn is-error" onClick={mint}>Mint {label}!</button>
                    : null}
                    {buttonState === "mint-more" ? 
                        <button className="nes-btn is-error" onClick={mint}>Mint More {label}!</button>
                    : null}
                    {buttonState === "waiting-auth" ?
                        <>
                            <img src={pacman} alt="Waiting For Authorization" width="5%" height="5%"></img>
                            <p></p>
                            <button className="nes-btn is-disabled" disabled>Waiting for authorization...</button>
        
                        </>
                    : null}
                    {buttonState === "minting" ?
                        <>
                            <img src={pacman} alt="Minting" width="5%" height="5%"></img>
                            <p></p>
                            <button className="nes-btn is-disabled" disabled>Minting {label}...</button>
                        </>
                    : null}
                    {buttonState === "max-minted" ?
                        <button className="nes-btn is-disabled" disabled>Limit Reached...</button>
                    : null}
                    {buttonState === "not-enough-sdollars" ?
                        <>
                            <div>
                            <p></p>
                            <p className="nes-text is-error">Not enough SDOLLAR to mint.</p>
                            <p>You can go to <a target="_blank" rel="noreferrer" href="https://app.terraswap.io">Terraswap</a> to get SDOLLAR.</p>
                            </div>
                        </> 
                    : null}
                    <p></p>
                    {mintingMessage !== "" ? 
                        <p>
                            {mintingMessage}
                        </p> 
                    : null}
                    {txHash !== "" ? <a target="_blank" rel="noreferrer" href={txHash}>See Transaction</a> : null}
                </>
        </div>
    )
}
