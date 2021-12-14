import React, { useState, useEffect } from 'react'
import useLCDClient from '../../hooks/useLCDClient';



export default function MintPrice({lootFactory, recallPrice}) {
    const lcdClient = useLCDClient()
    const [price, setPrice] = useState(0)
     useEffect(() => { 
        let isSubscribed = true;

        async function fetchData() {
            try {
                const result = await lcdClient.wasm.contractQuery(lootFactory, {
                "contract_config":{}
                });
                let formattedPrice = result.price / 100;
                formattedPrice = formattedPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                if(isSubscribed) {
                    setPrice(formattedPrice)
                    recallPrice(result.price)
                }
            } catch (e) {
                console.log(e)
            }
        }
        if (lootFactory) {
            fetchData();
        }
        return () => isSubscribed = false
    }, [lootFactory, lcdClient.wasm, recallPrice])
    return (
        <div>
            <p></p>
            <p>
            Mint price: {price} SDOLLAR
            </p>
        </div>
    )
}
