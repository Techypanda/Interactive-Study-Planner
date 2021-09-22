import '@testing-library/jest-dom';

const { location } = window;

/*
  Window.location doesnt exist in node so its mocked here for
  all tests as my CMS relies on window.location.replace.
*/
beforeAll(() => {
  // @ts-ignore
  delete window.location;
  // @ts-ignore
  window.location = { replace: jest.fn() };
});

afterAll(() => {
  window.location = location;
});
