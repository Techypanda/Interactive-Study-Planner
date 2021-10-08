import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

describe('App starts up successfully when ', () => {
    it('Renders without crashing', () => {
	render( <QueryClientProvider client={client}>
            <Router>
                <App />
            </Router>
        </QueryClientProvider> )
    })
    it('Renders and matches snapshot', () => {
	render( <QueryClientProvider client={client}>
            <Router>
                <App />
            </Router>
        </QueryClientProvider> )
    })
})
