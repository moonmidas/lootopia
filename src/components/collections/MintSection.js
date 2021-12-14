import React, { useState } from 'react'
import MintQuantity from './MintQuantity'
import MintButton from './MintButton';
import MintPrice from './MintPrice';


export default function MintSection(
    { collection, lootFactory, mintingQuantity, maxMintingQuantity, recallData, sdollarsBalance, recallSdollarsBalance}) {

    const pull_data = (data) => {
        recallData(data); // SETS DATA FROM CHILD COMPONENT
    }

    const [lootPrice, setLootPrice] = useState(0);
    const pull_price = (new_price) => {
        setLootPrice(new_price);
    }
    const pull_sdollar_balance = (new_sdollars) => {
        recallSdollarsBalance(new_sdollars);
    }

    return (
        <div className="text-center">
            
            <p></p>
            <div>
                <MintQuantity mintingQuantity={mintingQuantity} maxMintingQuantity={maxMintingQuantity}/>
            </div>
            <div>
                <MintPrice lootFactory={lootFactory} recallPrice={pull_price}/>
            </div>
            <div className="text-center">
                <MintButton 
                    label={collection.label} 
                    lootFactory={lootFactory} 
                    recallData={pull_data} 
                    mintingQuantity={mintingQuantity} 
                    maxMintingQuantity={maxMintingQuantity}
                    collection={collection}
                    sdollarsBalance={sdollarsBalance}
                    price={lootPrice}
                    recallSdollarsBalance={pull_sdollar_balance}/>
            </div>            
        </div>
    )
}
