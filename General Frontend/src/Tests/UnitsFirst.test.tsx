import React from 'react';
import { render } from '@testing-library/react';
import UnitsFirst from '../pages/UnitsFirst';
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

describe('Units First works when ', () => {
    it('Renders without crashing', () => {
	render( <QueryClientProvider client={client}>
            <Router>
                <UnitsFirst />
            </Router>
        </QueryClientProvider> )
    })
    it('Renders and matches snapshot', () => {
	render( <QueryClientProvider client={client}>
            <Router>
                <UnitsFirst />
            </Router>
        </QueryClientProvider> )
    })
})
