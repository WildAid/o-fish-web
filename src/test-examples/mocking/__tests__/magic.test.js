import { render, screen } from '../../../testUtils'
import React from 'react'

import Magic from '../magic.component'

/*
    === MOCKING EXAMPLE 1 - Automatic module mocks ===

    Magic component imports and calls functions from sampleFunctions.
    For unit tests though, we're only testing this component's UI.

    We don't have to test the functions (that can be in a different test)
    so we can just mock them.

    **Auto-mocks** allows us to create a mocked version of 
    the module by having a similarly named file in `__mocks__`
    e.g, see `__mocks__/sampleFunctions`

    Remove ".skip" below to run this example while testing
*/

jest.mock('../sampleFunctions')

describe.skip('Magic', () => {
    test('renders', async () => {
        render(<Magic base={100} />)
    
        expect(screen.getByText("Jest mocking examples")).toBeInTheDocument();
        expect(screen.getByText(/number.*42/)).toBeInTheDocument();
        expect(screen.getByText(/number.*43/)).toBeInTheDocument();
        // screen.debug()
    })
})

