import React from 'react'

export default function CollectionSupplyDetails({totalLootMinted, maxLootSupply}) {
    return (
        <div>
            
            <p></p>
            <div>
                Total Loot Minted: {totalLootMinted}/{maxLootSupply}
                <p></p>
                <progress className="nes-progress" value={totalLootMinted} max={maxLootSupply}></progress>

            </div>
            
        </div>
        
    )
}
