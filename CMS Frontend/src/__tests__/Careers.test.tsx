import React from 'react';
import { render } from '@testing-library/react';
import CareerManagement from '../pages/Careers/CareerManagement';
import CareerRouter from '../pages/Careers/CareerRouter';
import CreateCareer from '../pages/Careers/CreateCareer';
import EditCareer from '../pages/Careers/EditCareer';
import ViewCareer from '../pages/Careers/ViewCareer';
import * as hooks from "../api/hooks";

// @ts-ignore
jest.spyOn(hooks, "useCareer").mockResolvedValue(null);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    CareerId: '1xvftatvovt1ezpickrerafcebl'
  })
}));

describe('Careers is Working When', () => {
  describe('Career Management is Working which happens When', () => {
    it('Renders Without A Crash', () => {
      render(<CareerManagement />)
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(<CareerManagement />)
      expect(x).toMatchSnapshot();
    })
  })
  describe('Career Router is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(<CareerRouter />)
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(<CareerRouter />)
      expect(x).toMatchSnapshot();
    })
  })
  describe('Create Career is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(<CreateCareer />)
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(<CreateCareer />)
      expect(x).toMatchSnapshot();
    })
  })
  describe('Edit Career is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(<EditCareer />)
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(<EditCareer />)
      expect(x).toMatchSnapshot();
    })
  })
  describe('View Career is Working which happens when', () => {
    it('Renders Without A Crash', () => {
      render(<ViewCareer />)
    })
    it('Renders And Matches Snapshot', () => {
      const x = render(<ViewCareer />)
      expect(x).toMatchSnapshot();
    })
  })
})