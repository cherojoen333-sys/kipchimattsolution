import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatMoney } from '../data/catalog';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: number[];
  products: Product[];
  onRemoveWish: (id: number) => void;
  onAddToCart: (p: Product) => void;
}

export default function WishlistSidebar({
  isOpen,
  onClose,
  wishlist,
  products,
  onRemoveWish,
  onAddToCart
}: WishlistSidebarProps) {
  if (!isOpen) return null;

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col justify-between p-6 animate-slide-left">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span>Saved Wishlist ({savedProducts.length})</span>
            </h2>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[70vh] overflow-y-auto my-4 space-y-3">
            {savedProducts.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-12">No saved items yet.</p>
            ) : (
              savedProducts.map((p) => (
                <div key={p.id} className="pt-3 flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-xs text-gray-900 dark:text-white truncate">{p.name}</h4>
                    <p className="text-xs font-bold text-plum">{formatMoney(p.price)}</p>
                  </div>
                  <button
                    onClick={() => onAddToCart(p)}
                    className="bg-yellow text-plum font-black text-[10px] px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer hover:scale-105"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                  <button onClick={() => onRemoveWish(p.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
