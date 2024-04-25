"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="mb-2 me-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
    >
      {children}
    </button>
  );
}
