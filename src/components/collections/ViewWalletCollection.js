import React, { useEffect, useState } from 'react'
import SelectTokenInfo from './SelectTokenInfo'
import ViewLootInfo from './ViewLootInfo'

export default function ViewWalletCollection({tokens, cw721Contract, label}) {

    const [ selectedToken, setSelectedToken ] = useState(null)
    useEffect(() => {
        setSelectedToken(null)
    }, [label, cw721Contract, tokens])
    const pull_data = (data) => {
        //console.log("Token selected: " + data); // SETS DATA FROM CHILD COMPONENT
        setSelectedToken(data)
    }
    return (
        <>
            { selectedToken !== null ?
                    <ViewLootInfo token={selectedToken} cw721Contract={cw721Contract} label={label}/>
                : null 
            }
            { tokens && 
                <>
                    <p></p>
                    <div className="nes-container with-title is-centered is-dark">
                        <p className="title">Your Collection</p>
                        <div className="row">
                        { tokens.map(token =>  <SelectTokenInfo className="col-md-auto" key={token} token={token} recallData={pull_data}/>) }
                        </div>
                    </div>
                </>
            }
        </>
    )
}
