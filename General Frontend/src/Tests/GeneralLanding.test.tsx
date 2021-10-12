import { render } from '@testing-library/react';
import Landing from '../pages/Landing';

describe('Landing General Frontend is working which happens When', () => {
    it('Renders Without A Crash', () => {
        render(<Landing />)
    })
    it('Renders And Matches Snapshot', () => {
        const x = render(<Landing />)
        expect(x).toMatchSnapshot();
    })
})