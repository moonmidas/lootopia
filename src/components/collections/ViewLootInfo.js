import React, { useState, useEffect } from 'react'
import useLCDClient from '../../hooks/useLCDClient';

export default function ViewLootInfo({token, cw721Contract, label}) {
    const lcdClient = useLCDClient()

    const [ lootInfo, setLootInfo ] = useState()
    const [ formattedLootInfo, setFormattedLootInfo ] = useState()

    useEffect(() => { 
        let isSubscribed = true;

        async function fetchData() {
            let nftInfo;
            try {
                nftInfo = await lcdClient.wasm.contractQuery(cw721Contract, {
                "nft_info":{"token_id":token}
                });
                if (isSubscribed) {
                   setLootInfo(nftInfo)
                }
            } catch (e) {
                console.log(e)
            }
        }
        if (cw721Contract !== undefined && token !== undefined) {
            fetchData();
        }
        return () => (isSubscribed = false)

    }, [cw721Contract, lcdClient.wasm, token])

    useEffect(() => {
        //let isSubscribed = true;
        const formatLootInfo = (loot) => {
            const formattedLootInfo = {
                "id": loot.token_uri,
                "attributes": {}
            }
            addAttributesToLootInfo(formattedLootInfo.attributes, loot.extension.attributes)
            setFormattedLootInfo(formattedLootInfo)
            
        }
        //loop though the attributes and add them to the object. Key should be trait_type and value should be value.
        const addAttributesToLootInfo = (loot, attributes) => {
            attributes.forEach(attribute => {
                loot[attribute.trait_type] = attribute.value
            })
        }

        if (lootInfo !== undefined) {
            formatLootInfo(lootInfo)
        }
    
    }, [lootInfo])

    // turn string into case title
    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    return (
        <div>
            {formattedLootInfo !== undefined &&
                <>
                    <div className="nes-container text-center is-centered with-title is-dark">
                        <p className="title">{label} #{formattedLootInfo.id}</p>
                            { 
                            // Display each attribute
                            Object.keys(formattedLootInfo.attributes).map((key, index) => {
                                return (
                                    <div key={index} className="row">
                                        <div className="col-sm-6 text-start">
                                            <span className="nes-text is-error">{toTitleCase(key)}:</span>
                                        </div>
                                        <div className="col-sm-6 text-start">
                                            <span> {formattedLootInfo.attributes[key]}</span>
                                        </div>
                                    </div>
                                )
                            })
                            }
                    </div>
                </>
            }
        </div>
    )
}
