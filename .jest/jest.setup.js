import "@testing-library/jest-dom";
// import "@testing-library/jest-dom/extend-expect";
// jest.setup.js
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

jest.mock("recharts", () => {
  const OriginalRecharts = jest.requireActual("recharts");
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }) => (
      <div style={{ width: "400px", height: "300px" }}>{children}</div>
    ),
  };
});
