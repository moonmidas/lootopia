import { ConnectType, useWallet } from "@terra-money/wallet-provider"
import { useAddress } from "../../hooks/useConnectedAddress"

const ConnectButton = () => {
  const { connect, disconnect } = useWallet()
  const address = useAddress()
  // shorten address so it contains the first 6 and last 4 characters
  let shortAddress;
  if (address)
    shortAddress = address.slice(0, 6) + "..." + address.slice(-4)

  return address ? (
    <div className="text-center">      
      <p><button className="nes-btn is-dark" onClick={() => disconnect()}>Disconnect {shortAddress}</button></p>
    </div>
  ) : (
    <div className="text-center">
      <p><button className="nes-btn" onClick={() => connect(ConnectType.EXTENSION)}>
        Connect extension
      </button>
      &nbsp;
      <button className="nes-btn" onClick={() => connect(ConnectType.WALLETCONNECT)}>
        Connect mobile
      </button></p>
    </div>
  )
}

export default ConnectButton