// Collection.js
// Once someone selects the collection they want to see, 
// this component will display the options to either view the collection or mint a new nft.

import React, { useState, useEffect } from 'react'
import collections from '../../collections.json'
import MintSection from './MintSection';
import useConnectedAddress from '../../hooks/useConnectedAddress';
import useLCDClient from '../../hooks/useLCDClient';
import CollectionSupplyDetails from './CollectionSupplyDetails';
import ViewWalletCollection from './ViewWalletCollection';

export default function Collection({collection, sdollarsBalance, recallSdollarsBalance}) {
    let collectionItems, lootFactory, cw721Contract;
    if (collection) {
        collectionItems = collections[collection.value]
        lootFactory = collectionItems.loot_factory;
        cw721Contract = collectionItems.contract;
    }
    const address = useConnectedAddress()
    const lcdClient = useLCDClient()
    const [ mintingQuantity, setMintingQuantity ] = useState(0);
    const [ maxMintingQuantity, setMaxMintingQuantity ] = useState(0)
    const [ totalLootMinted, setTotalLootMinted ] = useState(0);
    const [ maxLootSupply, setMaxLootSupply ] = useState(0)
    const [ receivedDataFromMinting, setReceivedDataFromMinting ] = useState(true);

    useEffect(() => { 
        async function fetchData() {
            let walletPermissions;
            try {
                walletPermissions = await lcdClient.wasm.contractQuery(lootFactory, {
                "wallet_permissions":{"address":address}
                });
                try {
                    setMaxMintingQuantity(walletPermissions.limit_per_address)
                    setMintingQuantity(walletPermissions.amount_minted)
                    setTotalLootMinted(walletPermissions.curr_num_tokens)
                    setMaxLootSupply(walletPermissions.max_tokens)
                }
                catch(e) {
                    console.log(e)
                }
            } catch (e) {
                console.log(e)
            }
            setReceivedDataFromMinting(false)
        }
        if (lootFactory !== undefined) {
            if (receivedDataFromMinting === true || collection)
                fetchData();
        } 
    }, [address, lootFactory, lcdClient.wasm, receivedDataFromMinting, collection])
    
    const pullDataFromMinting = (data) => {
        setReceivedDataFromMinting(true); // SETS DATA FROM CHILD COMPONENT
    }

    const pull_sdollar_balance = (balance) => {
        recallSdollarsBalance(balance)
    }

    const [ tokensOwned, setTokensOwned ] = useState(null);
    useEffect(() => {
        const getLoots = async () => {
            let tokens;
            try {
                tokens = await lcdClient.wasm.contractQuery(cw721Contract, {
                    "tokens":{"owner":address, "limit":30, "start_from":"0"}
                });
                setTokensOwned(tokens.tokens);       
            } catch (e) {
                console.log(e)
            }
        }
        if (cw721Contract !== undefined) {
            getLoots()
        }
    }, [cw721Contract, address, lcdClient.wasm, collection, receivedDataFromMinting])

    return (
        <>
            <p></p>
            { collection !== null ? 
                <div className="row">
                    <div className="col-xs-12">
                        <div className="nes-container text-center with-title is-centered is-dark">
                            <p className="title">Collection Details</p>
                            <CollectionSupplyDetails
                                totalLootMinted={totalLootMinted}
                                maxLootSupply={maxLootSupply} 
                            />
                        </div>
                    </div>
                    <p></p>
                    { totalLootMinted < maxLootSupply ? 
                        <div className="col-xs-12">
                            <div className="nes-container text-center with-title is-centered is-dark">
                                <p className="title">Minter</p>
                                <MintSection
                                    mintingQuantity={mintingQuantity}
                                    maxMintingQuantity={maxMintingQuantity}
                                    collection={collection}
                                    lootFactory={collectionItems.loot_factory}
                                    setMaxMintingQuantity={setMaxMintingQuantity}
                                    recallData={pullDataFromMinting} 
                                    sdollarsBalance={sdollarsBalance}
                                    recallSdollarsBalance={pull_sdollar_balance}
                                />
                            </div>
                        </div>
                        : "" 
                    }
                    { tokensOwned !== null && tokensOwned.length > 0 &&
                        <>
                            <p></p>
                            <div className="col-xs-12">
                                <ViewWalletCollection tokens={tokensOwned} cw721Contract={cw721Contract} label={collection.label}/>
                            </div>
                        </>
                    }
                </div> 
                : "" 
            }
        </>
    )
}
