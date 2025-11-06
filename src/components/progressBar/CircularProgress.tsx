import React from "react";

type Props = {
  value?: number; // 0–100
  size?: number;
  color?: string;
  indeterminate?: boolean;
};

const CircularProgress: React.FC<Props> = ({
  value = 0,
  size = 60,
  color = "text-blue-500",
  indeterminate,
}) => {
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${color}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* الخلفية */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          opacity="0.2"
          fill="none"
        />

        {/* دائرة التحميل */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={indeterminate ? 0 : offset}
          className={`transition-all duration-300 ${
            indeterminate ? "circular-spin" : ""
          }`}
        />
      </svg>

      {!indeterminate && (
        <span className="absolute text-xs font-medium">{Math.round(value)}%</span>
      )}
    </div>
  );
};

export default CircularProgress;

