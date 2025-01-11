import React from "react";

const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#81B64C] hover:opacity-85 p-8 rounded text-2xl font-bold text-white"
    >
      {children}
    </button>
  );
};

export default Button;
