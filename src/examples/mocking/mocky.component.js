import React from 'react'

import someDefaultFunction, { someNamedFunction } from './fakeFunctions'

const Mocky = ({base}) => {
    return (
        <div>
            <h1>Jest mocking examples</h1>
            <span>
                {
                `Magic number is ${someDefaultFunction(base)}`
                }
            </span>
            <span>
                {
                `Other Magic number is ${someNamedFunction(base)}`
                }
            </span>
        </div>
    )
}

export default Mocky;