import React from 'react';
import { render } from '@testing-library/react';
import ViewAllUnits from '../pages/ViewAllUnits';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('View All Units is working when', () => {
	const client = new QueryClient()
	it('Renders without crashing', () => {
		render(<QueryClientProvider client={client}>
			<ViewAllUnits />
		</QueryClientProvider>)
	})
	it('Renders and matches snapshot', () => {
		const x = render(<QueryClientProvider client={client}>
			<ViewAllUnits />
		</QueryClientProvider>)
		expect(x).toMatchSnapshot();
	})
	it('Renders corresponding unit info pages', () => {
		// jest.mock('react-router-dom', () => {
		// 	useHistory: () => {
		// 		push: jest.fn();
		// 	}
		// })
	})
})
