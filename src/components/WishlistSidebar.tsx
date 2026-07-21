import { X, Trash2, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatMoney } from '../data/catalog';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: number[];
  products: Product[];
  onRemoveWish: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

export default function WishlistSidebar({
  isOpen,
  onClose,
  wishlist,
  products,
  onRemoveWish,
  onAddToCart
}: WishlistSidebarProps) {
  
  const savedItems = wishlist.map(id => products.find(p => p.id === id)).filter((p): p is Product => !!p);

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
      />

      {/* Wishlist Drawer */}
      <div className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-white sticky top-0 z-10">
          <h3 className="font-extrabold text-plum text-base flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span>Saved Wishlist ({wishlist.length})</span>
          </h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-500 text-gray-400 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close Wishlist"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Saved Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedItems.length > 0 ? (
            savedItems.map(item => {
              const isOutOfStock = item.stock <= 0;
              return (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 border border-gray-100 rounded-xl hover:border-gray-150 transition-colors"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image || 'https://via.placeholder.com/64?text=Grocery'} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=KP';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 text-xs sm:text-sm truncate">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-bold block mt-0.5">{item.brand}</span>
                    <div className="text-xs font-black text-plum mt-1">
                      {formatMoney(item.price)}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 gap-2">
                      <button 
                        onClick={() => onAddToCart(item)}
                        disabled={isOutOfStock}
                        className={`py-1.5 px-3 rounded-lg font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors ${isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200/50' : 'bg-plum/5 hover:bg-plum/10 text-plum'}`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{isOutOfStock ? 'Out of stock' : 'Add to cart'}</span>
                      </button>

                      <button 
                        onClick={() => onRemoveWish(item.id)}
                        className="text-red-500 hover:text-red-700 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors p-1"
                        title="Remove from saved list"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-24 text-gray-400 select-none">
              <Heart className="w-16 h-16 mx-auto mb-4 opacity-20 text-plum" />
              <h4 className="font-extrabold text-gray-700 text-sm mb-1">Your saved list is empty</h4>
              <p className="text-xs text-gray-400 max-w-[220px] mx-auto leading-relaxed">Save your absolute favorite grocery items & Kikapu deals here by clicking the heart button.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
