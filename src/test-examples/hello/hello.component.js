import React, { useState } from 'react'

const Hello = ({name}) => {
    const [greeting, setGreeting] = useState("Hello")

    return (
        <div>
            <div>{greeting} {name}</div>
            <button onClick={() => setGreeting("Bonjour")}>
                Change language
            </button>
        </div>
    )
}

export default Hello