import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Star Wars Character App', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const renderApp = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  };

  it('renders the character list and opens modal on click', async () => {
    renderApp();

    // Verify loading state or initial render
    expect(screen.getAllByText(/Star Wars/i)[0]).toBeInTheDocument();

    // Wait for the mocked characters to load
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    // Click the character card
    fireEvent.click(screen.getByText('Luke Skywalker'));

    // Verify modal opens with correct data
    await waitFor(() => {
      // Name is present
      const modalNames = screen.getAllByText('Luke Skywalker');
      expect(modalNames.length).toBeGreaterThan(1); // One in list, one in modal
      
      // Height formatted (1.72 m)
      expect(screen.getByText('1.72 m')).toBeInTheDocument();
      // Mass formatted (77 kg)
      expect(screen.getByText('77 kg')).toBeInTheDocument();
      // Date formatted (09-12-2014)
      expect(screen.getByText('09-12-2014')).toBeInTheDocument();
    });

    // Wait for homeworld to load
    await waitFor(() => {
      expect(screen.getAllByText('Tatooine').length).toBe(2); // One in filter dropdown, one in modal
      expect(screen.getByText('desert')).toBeInTheDocument();
    });
  });
});
