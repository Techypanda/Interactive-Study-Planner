import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CSV from '../pages/CSV';

describe("CSV Works when", () => {
  const client = new QueryClient();
  it("Renders Without A Crash", () => {
    render(
      <QueryClientProvider client={client}>
        <CSV />
      </QueryClientProvider>
    )
  })
  it("Meets Snapshot Specs", () => {
    const x = render(
      <QueryClientProvider client={client}>
        <CSV />
      </QueryClientProvider>
    )
    expect(x).toMatchSnapshot();
  })
})