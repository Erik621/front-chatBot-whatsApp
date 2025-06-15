import React from 'react';
import { Header } from './components/Header';
import { PromoCard } from './components/PromoCard';
import { MenuCard } from './components/MenuCard';
import { BottomNav } from './components/BottomNav';

const promoData = [
  { title: 'Caldo de Frang', price: 'R$ 5,00', image: '/caldo.png' },
  { title: 'Caldo de Frango', price: 'R$ 5,00', image: '/caldo.png' },
];

const menuData = [
  { title: 'X TUD', description: 'Hambúrguer, bacon, ovo, cheddar, tomate.', price: 'R$ 28,00', image: '/xtudo.png' },
  { title: 'X TUDO', description: 'Hambúrguer, bacon, ovo, cheddar, tomate.', price: 'R$ 28,00', image: '/xtudo.png' },
];

const categories = ['Lanches', 'Sobremesas', 'Caldos', 'Açaí'];

function App() {
  return (
    <div className="pb-16">
      <Header />

      <div className="p-4">
        <h2 className="text-orange-600 font-bold mb-2">Promoções:</h2>
        <div className="flex overflow-x-auto">
          {promoData.map((item, i) => (
            <PromoCard key={i} {...item} />
          ))}
        </div>

        <div className="flex mt-6 space-x-4 text-sm font-semibold">
          {categories.map((cat, i) => (
            <span
              key={i}
              className={`${
                i === 0 ? 'text-orange-600 border-b-2 border-orange-600' : 'text-black'
              } pb-1`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {menuData.map((item, i) => (
            <MenuCard key={i} {...item} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default App;
