"use client";
import React from "react";
interface IconTextProps {
  icon: React.ReactNode;
  text: string | undefined | number;
  className?: string;
}
const IconText = ({ icon, text, className }: IconTextProps) => {
  return (
    <p
      className={`flex justify-center items-center gap-1 text-[#02152680] ${className}`}
    >
      {icon} {text}
    </p>
  );
};

export default IconText;
