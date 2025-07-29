"use client";

import { useState, useEffect } from "react";

interface AlertProps {
  type: "success" | "error" | "warning";
  message: string;
  onClose?: () => void;
  duration?: number; // Optional duration in ms to auto-close
}

const Alert = ({ type, message, onClose, duration }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  const baseClasses =
    "p-4 rounded-md text-sm font-medium flex justify-between items-center shadow-lg";
  const typeClasses = {
    success: "bg-green-900/60 text-green-200 border border-green-700/60",
    error: "bg-red-900/60 text-red-200 border border-red-700/60",
    warning: "bg-yellow-900/60 text-yellow-200 border border-yellow-700/60",
  };

  const iconPaths = {
    success: "M5 13l4 4L19 7",
    error: "M6 18L18 6M6 6l12 12",
    warning: "M12 9v2m0 4h.01",
  };

  const SvgIcon = ({ type }: { type: "success" | "error" | "warning" }) => (
    <svg
      className="w-5 h-5 mr-3 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={iconPaths[type]}
      />
    </svg>
  );

  return (
    <div
      className={`${baseClasses} ${typeClasses[type]}`}
      role="alert"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="flex items-center">
        <SvgIcon type={type} />
        <span>{message}</span>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-xl font-bold hover:opacity-75 focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;
