import React from 'react';
import { render } from '@testing-library/react';
import UnitsFirst from '../pages/UnitsFirst';
import Initial from '../components/UnitsFirst/Initial';
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

describe('Units First works when ', () => {
    it('Renders without crashing', () => {
	render( <QueryClientProvider client={client}>
            <Router>
                <UnitsFirst />
            </Router>
        </QueryClientProvider> );
    })
    it('Renders and matches snapshot', () => {
	render( <QueryClientProvider client={client}>
            <Router>
                <UnitsFirst />
            </Router>
        </QueryClientProvider> );
    })
})

describe('Initial bottom up component works when ', () => {
    it('Renders without crashing', () => {
	render(<Initial/>)
    })
    it('Renders and matches snapshot', () => {
	const x = render(<Initial/>);
	expect(x).toMatchSnapshot();
    })
})
