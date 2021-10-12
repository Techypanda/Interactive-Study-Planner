import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ViewAllCareers from '../pages/ViewAllCareers';

describe('View All Careers is working which happens When', () => {
    const client = new QueryClient()
    it('Renders Without A Crash', () => {
        render(<QueryClientProvider client={client}>
            <ViewAllCareers />
        </QueryClientProvider>)
    })
    it('Renders And Matches Snapshot', () => {
        const x = render(<QueryClientProvider client={client}>
            <ViewAllCareers />
        </QueryClientProvider>)
        expect(x).toMatchSnapshot();
    })
    it('Renders corresponding career info pages', () => { // ? not sure what was supposed to be here...
    })
})
