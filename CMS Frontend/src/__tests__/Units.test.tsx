import React from 'react';
import { render } from '@testing-library/react';
import UnitManagement from '../pages/Units/UnitManagement';
import UnitRouter from '../pages/Units/UnitRouter';
import CreateUnit from '../pages/Units/CreateUnit';
import EditUnit from '../pages/Units/EditUnit';
import ViewUnit from '../pages/Units/ViewUnit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from "react-router-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    UnitCode: 'INDH1006',
  })
}));

describe('Units is Working When', () => {
  const client = new QueryClient();
  describe('UnitManagement is Working which happens When', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <UnitManagement />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <UnitManagement />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('UnitRouter is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <Router>
            <UnitRouter />
          </Router>
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <Router>
            <UnitRouter />
          </Router>
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('CreateUnit is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <CreateUnit />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <CreateUnit />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('EditUnit is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <EditUnit />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <EditUnit />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('ViewUnit is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <ViewUnit />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <ViewUnit />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
})