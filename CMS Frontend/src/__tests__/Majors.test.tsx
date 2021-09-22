import React from 'react';
import { render } from '@testing-library/react';
import MajorManagement from '../pages/Majors/MajorManagement';
import MajorRouter from '../pages/Majors/MajorRouter';
import CreateMajor from '../pages/Majors/CreateMajor';
import EditMajor from '../pages/Majors/EditMajor';
import ViewMajor from '../pages/Majors/ViewMajor';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from "react-router-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    MajorCode: 'MJRU-PHCOL',
  })
}));

describe('Specializations is Working When', () => {
  const client = new QueryClient();
  describe('MajorManagement is Working which happens When', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <MajorManagement />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <MajorManagement />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('MajorRouter is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <Router>
            <MajorRouter />
          </Router>
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <Router>
            <MajorRouter />
          </Router>
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('CreateMajor is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <CreateMajor />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <CreateMajor />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('EditMajor is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <EditMajor />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <EditMajor />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('ViewMajor is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <ViewMajor />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <ViewMajor />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
})