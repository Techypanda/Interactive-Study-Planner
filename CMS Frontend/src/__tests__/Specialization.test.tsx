import React from 'react';
import { render } from '@testing-library/react';
import SpecManagement from '../pages/Specialization/SpecializationManagement';
import SpecRouter from '../pages/Specialization/SpecializationRouter';
import CreateSpec from '../pages/Specialization/CreateSpecialization';
import EditSpec from '../pages/Specialization/EditSpec';
import ViewSpec from '../pages/Specialization/ViewSpecialization';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from "react-router-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    SpecCode: 'SPUC-INENT',
  })
}));

describe('Specializations is Working When', () => {
  const client = new QueryClient();
  describe('SpecManagement is Working which happens When', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <SpecManagement />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <SpecManagement />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('SpecRouter is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <Router>
            <SpecRouter />
          </Router>
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <Router>
            <SpecRouter />
          </Router>
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('CreateSpec is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <CreateSpec />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <CreateSpec />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('EditSpec is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <EditSpec />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <EditSpec />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
  describe('ViewSpec is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(
        <QueryClientProvider client={client}>
          <ViewSpec />
        </QueryClientProvider>
      )
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(
        <QueryClientProvider client={client}>
          <ViewSpec />
        </QueryClientProvider>
      )
      expect(x).toMatchSnapshot();
    })
  })
})