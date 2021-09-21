import React from 'react';
import { render } from '@testing-library/react'
import * as enzyme from 'enzyme';
import TopdownFilled from '../pages/TopdownFilled';

describe('Top down filled page is working which happens when', () => { 
    it('Renders Without A crash', () => { 
        render(<TopdownFilled />)
    })
    it('Renders and matches Snapshot', () => { 
        const x = render(<TopdownFilled/>)
        expect(x).toMatchSnapshot();
    })
})

