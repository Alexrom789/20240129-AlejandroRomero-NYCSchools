import { render, screen } from '@testing-library/react';
import App from './App';

test('renders searchbar and school card list components', () => {
  render(<App />);

  // Check if the heading is rendered
  const headingElement = screen.getByText(/NYC Highschools/i);
  expect(headingElement).toBeInTheDocument();

  // Check if the SearchBar component is rendered
  const searchbarElement = screen.getByPlaceholderText(/Search Schools/i);
  expect(searchbarElement).toBeInTheDocument();

  // // Check if the SchoolCardList component is rendered
 //  ..... would probably use get by id method
});

//**NOTE**: For sake of time I did not right unit tests for each of my components but if I did they would do something like this:/
// SchoolCardList.test.js

// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // for better matching functions
// import SchoolCardList from './SchoolCardList';

// // Mocking fetch calls
// jest.mock('node-fetch');

// // Sample data for testing
// const mockSchoolData = [
//   // ... mock school data
// ];

// const mockSatData = [
//   // ... mock SAT data
// ];

// beforeEach(() => {
//   // Reset mocks and restore fetch to its original implementation
//   jest.resetAllMocks();
// });

// describe('SchoolCardList', () => {
//   it('renders loading state initially', async () => {
//     render(<SchoolCardList searchTerm="" />);
//     expect(screen.getByText('Loading...')).toBeInTheDocument();
//   });

//   it('renders schools after loading', async () => {
//     // Mock fetch calls
//     global.fetch
//       .mockResolvedValueOnce({
//         ok: true,
//         json: async () => mockSchoolData,
//       })
//       .mockResolvedValueOnce({
//         ok: true,
//         json: async () => mockSatData,
//       });

//     render(<SchoolCardList searchTerm="" />);

//     // Wait for the loading state to resolve
//     await waitFor(() => {
//       expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
//     });

//   });

//   it('filters schools based on search term', async () => {
//     global.fetch
//       .mockResolvedValueOnce({
//         ok: true,
//         json: async () => mockSchoolData,
//       })
//       .mockResolvedValueOnce({
//         ok: true,
//         json: async () => mockSatData,
//       });

//     render(<SchoolCardList searchTerm="someSearchTerm" />);
//   });

// });