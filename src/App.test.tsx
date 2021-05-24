import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders grid', () => {
    render(<App />);
    const gridElement = screen.getByTestId('grid-element');
    expect(gridElement).toBeInTheDocument();
});
