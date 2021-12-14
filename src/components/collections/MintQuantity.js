import React from 'react'


export default function MintQuantity({ mintingQuantity, maxMintingQuantity }) {

    return (
        <div>
            <p className="text-center">You've minted: {mintingQuantity}/{maxMintingQuantity}</p>
            <progress className="nes-progress is-primary" value={mintingQuantity} max={maxMintingQuantity}></progress>
        </div>
    )
}
