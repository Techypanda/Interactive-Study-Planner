import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('General App is Working When', () => {
  it('Renders Without A Crash', () => {
    render(<App />)
  })
  it('Renders And Matches Snapshot', () => {
    const x = render(<App />)
    expect(x).toMatchSnapshot();
  })
})