import React, { useState } from 'react'
import Select from 'react-select'
import collections from '../collections.json'
import Collection from './collections/Collection'

export default function SelectCollections({sdollarsBalance, recallSdollarsBalance}) {
    const options = collections.map((collection, index) => ({
        value: index,
        label: collection.name
    }))

    const pull_sdollar_balance = (data) => {
        recallSdollarsBalance(data);
    }

    const [chosenCollection, setChosenCollection] = useState(null);
    const handleChange = e => {
        setChosenCollection(e);
    }
    
    return (

        // select from a list of items
        <div>
            <p></p>
            <div className="nes-container text-center is-centered with-title is-dark">
                <p className="title">Select Collection</p>
                <Select options={options} className="nes-select" onChange={handleChange}/>
            </div>
            <Collection collection={chosenCollection} sdollarsBalance={sdollarsBalance} recallSdollarsBalance={pull_sdollar_balance}/>        
        </div>
    )
}
