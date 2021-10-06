import React from 'react';
import { render } from '@testing-library/react';
import ViewAllUnits from '../pages/ViewAllUnits';

describe('View All Units is working when', () => {
    it('Renders without crashing', () => {
	render(<ViewAllUnits/>)
    })
    it('Renders and matches snapshot', () => {
	const x = render(<ViewAllUnits/>)
	expect(x).toMatchSnapshot();
    })
    it('Renders corresponding unit info pages', () => {
	jest.mock('react-router-dom', () => {
	    useHistory: () => {
		push: jest.fn();
	    }
	})
    })
})
