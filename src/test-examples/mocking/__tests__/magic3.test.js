import { render, screen } from '../../../testUtils'
import React from 'react'

import Magic from '../magic.component'

/*
    === MOCKING EXAMPLE 3 - Spying on implemented module mocks ===

    Similar to magic2.test.js, but also spying on the mock methods

    Variables used inside the mock must be prefixed with "mock",
    e.g. "mockDefaultFunction"

    Remove ".skip" below to run this example while testing
*/

const mockDefaultFunction = jest.fn()
const mockNamedFunction = jest.fn()

jest.mock('../sampleFunctions', () => ({
    __esModule: true,
    default: () => mockDefaultFunction(),
    someNamedFunction: () => mockNamedFunction()
}))

describe.skip('Magic', () => {
    test('renders', async () => {
        // Because we have a jest.fn(), we can replace the mocks return value and/or implementation
        // in this test or in other ones
        mockDefaultFunction.mockReturnValue(45)
        mockNamedFunction.mockImplementation(() => {
            console.log("hey I'm a mock")
            return 46;
        })

        render(<Magic base={100} />)
    
        expect(screen.getByText("Jest mocking examples")).toBeInTheDocument();
        expect(screen.getByText(/number.*45/)).toBeInTheDocument();
        expect(screen.getByText(/number.*46/)).toBeInTheDocument();
        // screen.debug()

        // We can also verify that they are called, using
        // the variable declared above
        expect(mockDefaultFunction).toHaveBeenCalled()
        expect(mockNamedFunction).toHaveBeenCalled()
    })
})

