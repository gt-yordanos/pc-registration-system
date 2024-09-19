// src/components/InfoCard.jsx
import React from 'react';

const InfoCard = ({ title, value }) => {
  return (
    <div className="p-4 bg-[#00294D] text-[#CCFFFF] rounded-md shadow-md">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-xl">{value}</p>
  </div>
  );
};

export default InfoCard;
