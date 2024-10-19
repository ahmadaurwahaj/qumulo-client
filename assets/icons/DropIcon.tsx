import React from "react";

function DropIcon({
  width = "19",
  height = "18",
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.27744 10.9875L6.89619 8.6063C6.65869 8.3688 6.60244 8.09692 6.72744 7.79067C6.85244 7.48442 7.08369 7.3313 7.42119 7.3313H12.1837C12.5087 7.3313 12.7337 7.48442 12.8587 7.79067C12.9837 8.09692 12.9274 8.3688 12.6899 8.6063L10.3087 10.9875C10.2337 11.0625 10.1524 11.1157 10.0649 11.1469C9.97744 11.1782 9.88994 11.1938 9.80244 11.1938C9.68994 11.1938 9.59306 11.1782 9.51181 11.1469C9.43056 11.1157 9.35244 11.0625 9.27744 10.9875Z"
        fill="#A6AAAE"
      />
    </svg>
  );
}

export default DropIcon;
