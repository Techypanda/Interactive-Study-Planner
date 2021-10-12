import React from 'react';
import { render } from '@testing-library/react';
import UnitsFirst from '../pages/UnitsFirst';
import Initial from '../components/UnitsFirst/Initial';
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Major } from '../types';

describe('Units First works when', () => {
    const client = new QueryClient();
    it('Renders without crashing', () => {
        render(<QueryClientProvider client={client}>
            <Router>
                <UnitsFirst />
            </Router>
        </QueryClientProvider>);
    })
    it('Renders and matches snapshot', () => {
        const x = render(<QueryClientProvider client={client}>
            <Router>
                <UnitsFirst />
            </Router>
        </QueryClientProvider>);
        expect(x).toMatchSnapshot()
    })
})

describe('Initial bottom up component works when', () => {
    const client = new QueryClient();
    const mockMajors: Array<Major> = [{
        MajorCode: "",
        Name: "string",
        Description: "string",
        Credits: 2,
        Units: ["", ""],
        UnitAntiReqs: [[""], ["a"]],
        SpecAntiReqs: [[""], ["a"]]
    }]
    const mockSelectMajor = (m: Major) => { }
    it('Renders without crashing', () => {
        render(<QueryClientProvider client={client}>
            <Initial majors={mockMajors} selectMajor={mockSelectMajor} />
        </QueryClientProvider>)
    })
    it('Renders and matches snapshot', () => {
        const x = render(<QueryClientProvider client={client}>
            <Initial majors={mockMajors} selectMajor={mockSelectMajor} />
        </QueryClientProvider>);
        expect(x).toMatchSnapshot();
    })
})
