import React from 'react';
import { render } from '@testing-library/react';
import ViewAllCareers from '../pages/ViewAllCareers';

describe('View All Careers is working which happens When', () => {
    it('Renders Without A Crash', () => {
        render(<ViewAllCareers />)
    })
    it('Renders And Matches Snapshot', () => {
        const x = render(<ViewAllCareers />)
        expect(x).toMatchSnapshot();
    })
     it('Renders corresponding career info pages', () => {
	jest.mock('react-router-dom', () => {
	    useHistory: () => {
		push: jest.fn();
	    }
	})
     })
})
