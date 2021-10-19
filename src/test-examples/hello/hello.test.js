import React from 'react';
import Hello from './hello.component';
import { render, screen, userEvent } from '../../testUtils'

/*
    Remove ".skip" below to run this example while testing
*/

describe.skip('Hello', () => {
    test('renders', () => {
        render(<Hello name="world" />);
    
        // * outputs the current HTML of entire screen
        // screen.debug();
    
        expect(screen.getByText("Hello world")).toBeInTheDocument();
    
        // * outputs current HTML of a specific element
        // regex can also be used instead of string
        screen.debug(screen.getByText(/H[a-z]{1,5} world/i))
    });

    test('changes language', async () => {
        render(<Hello name="world" />);

        // buttons have default role="button" even if not set
        userEvent.click(screen.getByRole("button"))

        // await waitFor(expect...) or expect(await findBy*) is needed after a state change
        expect(await screen.findByText(/bonjour.*/i)).toBeInTheDocument();
    })
})
