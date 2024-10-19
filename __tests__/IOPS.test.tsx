// __tests__/metrics.test.tsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // To use custom matchers like toBeInTheDocument
import Home from "@/app/metrics/page";
import { useIopsMetrics, useThroughputMetrics } from "@/hooks/useMetrics.hook";

// Mock the hooks that fetch metrics
jest.mock("@/hooks/useMetrics.hook", () => ({
  useIopsMetrics: jest.fn(),
  useThroughputMetrics: jest.fn(),
}));

describe("Home Component", () => {
  const mockData = {
    data: [
      { date: "2024-10-10T00:00:00.000Z", read: 100, write: 200 },
      { date: "2024-10-11T00:00:00.000Z", read: 150, write: 250 },
    ],
    readAvg: 125,
    writeAvg: 225,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state correctly", () => {
    // Mock the hook to return a loading state
    (useIopsMetrics as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    (useThroughputMetrics as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<Home />);

    // Check that the skeleton elements are displayed
    expect(screen.getAllByTestId("skeleton")).toHaveLength(2); // Adjust if you have two skeletons for each chart
  });

  it("renders error state correctly", () => {
    // Mock the hook to return an error state
    (useIopsMetrics as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    (useThroughputMetrics as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<Home />);

    // Check that multiple skeleton elements are displayed (adjust the expected length as needed)
    const skeletonElements = screen.queryAllByTestId("skeleton");
    expect(skeletonElements.length).toBe(2); // Adjust this based on the number of skeletons expected
  });

  it("renders chart data correctly when data is fetched", () => {
    // Mock the hook to return data
    (useIopsMetrics as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
    (useThroughputMetrics as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<Home />);

    // Check that the chart headers exist
    expect(screen.getAllByText(/IOPS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Throughput/i).length).toBeGreaterThan(0);

    // Get all elements containing "125" and filter to find the one for "IOPS"
    const iopsReadValue = screen.getAllByText(/125/i).find((element) => {
      return (
        element.closest("div")?.querySelector("span")?.textContent === "IOPS"
      );
    });

    const throughputReadValue = screen.getAllByText(/125/i).find((element) => {
      return (
        element.closest("div")?.querySelector("span")?.textContent === "KB/s"
      );
    });

    // Verify the "125" value for IOPS is present
    expect(iopsReadValue).toBeInTheDocument();

    // Verify the "125" value for Throughput is present
    expect(throughputReadValue).toBeInTheDocument();

    // Get all elements containing "225" and filter to find the one for "IOPS"
    const iopsWriteValue = screen.getAllByText(/225/i).find((element) => {
      return (
        element.closest("div")?.querySelector("span")?.textContent === "IOPS"
      );
    });

    const throughputWriteValue = screen.getAllByText(/225/i).find((element) => {
      return (
        element.closest("div")?.querySelector("span")?.textContent === "KB/s"
      );
    });

    // Verify the "225" value for IOPS is present
    expect(iopsWriteValue).toBeInTheDocument();

    // Verify the "225" value for Throughput is present
    expect(throughputWriteValue).toBeInTheDocument();
  });
});
