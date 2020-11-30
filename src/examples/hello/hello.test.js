import React from 'react';
import Hello from './hello.component';
import { render, screen } from '../../testUtils'

it('renders without crashing', () => {
    render(<Hello name="world" />);

    // screen.debug();
    expect(screen.getByText("Hello world")).toBeInTheDocument();
});