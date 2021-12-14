import React from 'react'
import { useWallet } from "@terra-money/wallet-provider"
import { useAddress } from '../../hooks/useConnectedAddress'

export default function NetworkStatus() {
    const { network } = useWallet()
    const address = useAddress();
    return (
        <div>
            {address !== undefined ? <>{network && network.name === "mainnet" ? <p>Network: Columbus-5</p> : <p>Network: <span className="nes-text is-warning">Testnet</span></p>}</> : null }
        </div>
    )
}
