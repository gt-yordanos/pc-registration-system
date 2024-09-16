// src/components/InfoCard.jsx
import React from 'react';

const InfoCard = ({ title, value }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default InfoCard;
