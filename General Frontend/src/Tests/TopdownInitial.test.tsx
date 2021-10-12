import { render } from '@testing-library/react';
import TopdownInitial from '../pages/TopdownInitial';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('Top down initial page is working which happens when', () => {
    const client = new QueryClient()
    it('Renders Without A Crash', () => {
        render(<QueryClientProvider client={client}>
            <TopdownInitial />
        </QueryClientProvider>)
    })
    it('Renders and matches Snapshot', () => {
        const x = render(<QueryClientProvider client={client}>
            <TopdownInitial />
        </QueryClientProvider>)
        expect(x).toMatchSnapshot();
    })
})