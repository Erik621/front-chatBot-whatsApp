import React from 'react';

interface PromoCardProps {
  title: string;
  price: string;
  image: string;
}

export const PromoCard = ({ title, price, image }: PromoCardProps) => (
  <div className="bg-white rounded-lg shadow-md w-40 p-2 mx-1">
    <img src={image} alt={title} className="rounded-lg mb-2" />
    <h2 className="text-sm font-bold">{title}</h2>
    <p className="text-orange-600 font-bold">{price}</p>
  </div>
);
