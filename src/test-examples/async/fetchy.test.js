import React from 'react';
import Fetchy from './fetchy.component';
import { render, screen } from '../../testUtils'

it("shows Loading and Data", async () => {
    render(<Fetchy />);
    
    // Default timeout of findBy* queries is 1000ms
    // We can add a timeout in the third parameter object waitForOptions
    expect(await screen.findByText("Loading", {}, { timeout: 3000 })).toBeInTheDocument();
    // screen.debug();

    expect(await screen.findByText("Data:", {}, {timeout: 3000})).toBeInTheDocument();
    // screen.debug();
});