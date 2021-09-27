import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import ViewCareer from "../components/shared/ViewCareer";
import ViewMajor from "../components/shared/ViewMajor";
import ViewSpecialization from "../components/shared/ViewSpecialization";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 25/09/2021
 * Description: Testing for information pages
 */

const client = new QueryClient();

//ViewCareer
describe("Career Information Page is working when ", () => {
    //Mock user career selection
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useParams: () => ({
          id : "1xvftd1oiymx333qspd7gclw7ro",
        })
      }));

    it("Renders Without A Crash", () => {
        render(
            <QueryClientProvider client={client}>
                <Router>
                    <ViewCareer />
                </Router>
            </QueryClientProvider> 
        );
    })
    it("Renders And Matches Snapshot", () => {
        const x = render(
            <QueryClientProvider client={client}>
                <Router>
                    <ViewCareer />
                </Router>
            </QueryClientProvider> 
        );
        expect(x).toMatchSnapshot();
    })
})

//ViewMajor
describe("Major Information Page is working when ", () => {
    //Mock user career selection
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useParams: () => ({
          id : "MJRU-HUMBM",
        })
      }));

    it("Renders Without A Crash", () => {
        render(
            <QueryClientProvider client={client}>
                <Router>
                    <ViewMajor />
                </Router>
            </QueryClientProvider> 
        );
    })
    it("Renders And Matches Snapshot", () => {
        const x = render(
            <QueryClientProvider client={client}>
                <Router>
                    <ViewMajor />
                </Router>
            </QueryClientProvider> 
        );
        expect(x).toMatchSnapshot();
    })
})

//ViewSpecialization
describe("Specialization Information Page is working when ", () => {
    //Mock user career selection
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useParams: () => ({
          id : "SPUC-ICBIO",
        })
      }));

    it("Renders Without A Crash", () => {
        render(
            <QueryClientProvider client={client}>
                <Router>
                    <ViewSpecialization />
                </Router>
            </QueryClientProvider> 
        );
    })
    it("Renders And Matches Snapshot", () => {
        const x = render(
            <QueryClientProvider client={client}>
                <Router>
                    <ViewSpecialization />
                </Router>
            </QueryClientProvider> 
        );
        expect(x).toMatchSnapshot();
    })
})