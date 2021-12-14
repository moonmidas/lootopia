import React, { useEffect, useState } from 'react'
import ConnectWalletButton from './wallet/ConnectWalletButton'
import SdollarsQuantity from './wallet/SdollarsQuantity'
import NetworkStatus from './wallet/NetworkStatus'

export default function Wallet({address, recallSdollarsBalance}) {
    const [newAddress, setNewAddress] = useState(address)
    useEffect(() => {
        setNewAddress(address)
    }, [address])

    const pull_sdollarsBalance = (sdollarsBalance) => {
        recallSdollarsBalance(sdollarsBalance)
    }

    return (
        <>
        <div>
            <ConnectWalletButton />
        </div>
        <div>
            <NetworkStatus/>
        </div>
        <div>
            <SdollarsQuantity address={newAddress} recallSdollarsBalance={pull_sdollarsBalance}/>
        </div>
        </>
    )
}
