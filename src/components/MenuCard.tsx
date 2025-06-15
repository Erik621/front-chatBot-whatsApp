import React from 'react';

interface MenuCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
}

export const MenuCard = ({ title, description, price, image }: MenuCardProps) => (
  <div className="bg-white rounded-lg shadow-md w-44 p-2 mx-1">
    <img src={image} alt={title} className="rounded-lg mb-2" />
    <h2 className="font-bold">{title}</h2>
    <p className="text-sm text-gray-600">{description}</p>
    <p className="font-bold mt-1">{price}</p>
  </div>
);
