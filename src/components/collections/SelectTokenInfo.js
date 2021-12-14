import React from 'react'

export default function SelectTokenInfo({ token, recallData }) {

    const pull_data = (data) => {
        recallData(data); // SETS DATA FROM CHILD COMPONENT
    }

    return (
        <div className="col-md-auto" >
            <button className="nes-badge is-splited" onClick={() => pull_data(token)}>
                <span className="is-primary">View</span>
                <span className="is-primary">#{token}</span>
            </button> 
        </div>
    )
}
