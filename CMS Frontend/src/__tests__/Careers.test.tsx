import React from 'react';
import { render } from '@testing-library/react';
import CareerManagement from '../pages/Careers/CareerManagement';
import CareerRouter from '../pages/Careers/CareerRouter';
import CreateCareer from '../pages/Careers/CreateCareer';
import EditCareer from '../pages/Careers/EditCareer';
import ViewCareer from '../pages/Careers/ViewCareer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from "react-router-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    CareerId: '5c760179-2e1c-4fd5-98f8-dc92ce411b4e',
  })
}));

describe('Careers is Working When', () => {
  const client = new QueryClient();
  describe('Career Management is Working which happens When', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <CareerManagement />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <CareerManagement />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('Career Router is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <Router>
            <CareerRouter />
          </Router>
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <Router>
            <CareerRouter />
          </Router>
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('Create Career is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <CreateCareer />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <CreateCareer />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('Edit Career is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <EditCareer />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <EditCareer />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('View Career is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <ViewCareer />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <ViewCareer />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
})