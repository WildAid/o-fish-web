import { render, screen } from '../../testUtils'
import React from 'react'

import Mocky from './mocky.component'

/*
    Mocky component imports and calls functions from fakeFunctions.
    For unit tests though, we're only testing the UI.
    We don't have to test the functions, so we can just mock it.
    Auto-mocks allows us to create a mocked version of 
    the module in `__mocks__`, e.g, see `__mocks__/fakeFunctions`
*/

jest.mock('./fakeFunctions')

test('mocking works', async () => {
    render(<Mocky base={100} />)

    expect(screen.getByText("Jest mocking examples")).toBeInTheDocument();
    expect(screen.getByText(/number.*42/)).toBeInTheDocument();
    expect(screen.getByText(/number.*43/)).toBeInTheDocument();
    // screen.debug()
})