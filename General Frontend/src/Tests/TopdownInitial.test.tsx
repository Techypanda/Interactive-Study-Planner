import React from 'react';
import { render } from '@testing-library/react';
import * as enzyme from 'enzyme';
import TopdownInitial from '../pages/TopdownInitial';

describe('Top down initial page is working which happens when', () => { 
    it('Renders Without A Crash', () => { 
        render(<TopdownInitial />)
    })
    it('Renders and matches Snapshot', () => { 
        const x = render(<TopdownInitial />)
        expect(x).toMatchSnapshot();

    })
})