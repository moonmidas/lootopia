import React, { useState, useEffect } from 'react'
import useLCDClient from '../../hooks/useLCDClient'
import { SDOLLAR_CONTRACT } from '../../constants'
import { useAddress } from "../../hooks/useConnectedAddress"
import { useWallet } from "@terra-money/wallet-provider"

export default function SdollarsQuantity({recallSdollarsBalance}) {

    const address = useAddress()
    const { network } = useWallet()
    const lcdClient = useLCDClient()
    const [sdollars, setSdollars] = useState(0)
    useEffect(() => {
        const querySdollarAmount = async () => {
            try {
                const result = await lcdClient.wasm.contractQuery(SDOLLAR_CONTRACT, 
                    {
                        "balance": {"address":address}
                    }
                );
                let sdollarsFormatted = result.balance / 100;
                sdollarsFormatted = sdollarsFormatted.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
                setSdollars(sdollarsFormatted)
                recallSdollarsBalance(result.balance)
            } catch (e) {
                console.log(e)
            }
        } 
        if (address) {
            querySdollarAmount()
        } else if (address === undefined) {
            setSdollars(0)
        }
    }, [address, sdollars, lcdClient, network, recallSdollarsBalance])

    return (
        <div>
            {address !== undefined ? <><p></p><p>Your balance: {sdollars} SDOLLARS</p></> : null}
        </div>
    )
}
