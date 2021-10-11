import { render, screen } from '../../../testUtils'
import React from 'react'

import Magic from '../magic.component'

/*
    === MOCKING EXAMPLE 2 - Implementing module mocks ===

    Magic component imports and calls functions from sampleFunctions.
    For unit tests though, we're only testing this component's UI.

    We don't have to test the functions (that can be in a different test)
    so we can just mock them.

    **Module mocks** allows us to create a mocked version of 
    the module here

    Don't forget the prop `__esModule: true` for ES6 modules (import, export)

    Remove ".skip" below to run this example while testing
*/

jest.mock('../sampleFunctions', () => ({
    __esModule: true,
    default: () => 43, 
    someNamedFunction: () => 44
}))

describe.skip('Magic', () => {
    test('renders', async () => {
        render(<Magic base={100} />)
    
        expect(screen.getByText("Jest mocking examples")).toBeInTheDocument();
        expect(screen.getByText(/number.*43/)).toBeInTheDocument();
        expect(screen.getByText(/number.*44/)).toBeInTheDocument();
        // screen.debug()
    })
})

