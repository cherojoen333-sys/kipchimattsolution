import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatMoney } from '../data/catalog';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemove: (id: number) => void;
  onAddToCart: (p: Product) => void;
  addedProductId: number | null;
}

export default function CompareModal({
  isOpen,
  onClose,
  products,
  onRemove,
  onAddToCart
}: CompareModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-4xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">Product Comparison</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-8">No products selected for comparison.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl relative space-y-3">
                <button
                  onClick={() => onRemove(p.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold"
                >
                  ×
                </button>
                <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-xl" />
                <h3 className="font-extrabold text-xs text-gray-900 dark:text-white">{p.name}</h3>
                <p className="font-black text-plum text-sm">{formatMoney(p.price)}</p>
                <div className="text-[11px] text-gray-500 space-y-1 border-t border-gray-200 dark:border-gray-700 pt-2">
                  <p><strong>Brand:</strong> {p.brand}</p>
                  <p><strong>Category:</strong> {p.category}</p>
                  <p><strong>Stock:</strong> {p.stock} units</p>
                </div>
                <button
                  onClick={() => onAddToCart(p)}
                  className="w-full bg-yellow text-plum font-black text-xs py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Basket</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
