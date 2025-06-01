import React from "react";

interface TopBarItemProps {
  title: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TopBarItem: React.FC<TopBarItemProps> = ({ title, isActive, onClick }) => {
  return (
    <div
    onClick={onClick}
    className={`flex items-center p-3 transition-transform duration-300 rounded-lg cursor-pointer 
                ${isActive ? "border-b-2 border-black text-black bg-beige-300" : "text-black hover:scale-105 hover:bg-beige-200"}`}
  >
    <span className="ml-3 font-medium text-base">{title}</span>
  </div>
  );
};

export default TopBarItem;