import React from 'react';
import { render } from '@testing-library/react';
import * as enzyme from 'enzyme';
import Landing from '../pages/Landing';

describe('Landing General Frontend is working which happens When', () => {
    it('Renders Without A Crash', () => {
        render(<Landing />)
    })
    it('Renders And Matches Snapshot', () => {
        const x = render(<Landing />)
        expect(x).toMatchSnapshot();
    })
})