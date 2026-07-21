import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Lock } from 'lucide-react';
import { CartItem, StoreSettings } from '../types';
import { formatMoney } from '../data/catalog';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  settings: StoreSettings;
  onQtyChange: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  settings,
  onQtyChange,
  onRemoveItem,
  onCheckout
}: CartSidebarProps) {
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal >= settings.freeDeliveryThreshold || subtotal === 0 ? 0 : settings.deliveryFee;
  const total = subtotal + deliveryFee;

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
      />

      {/* Cart Drawer */}
      <div className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-white sticky top-0 z-10">
          <h3 className="font-extrabold text-plum text-base flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Your Shopping Basket ({cart.reduce((s, i) => s + i.qty, 0)})</span>
          </h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-500 text-gray-400 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close Cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Item list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map(item => (
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
                  <div className="text-xs font-black text-plum mt-1">
                    {formatMoney(item.price * item.qty)}
                  </div>
                  
                  {/* Quantity and Actions bar */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-150 rounded-lg p-1">
                      <button 
                        onClick={() => onQtyChange(item.id, -1)}
                        className="w-6 h-6 rounded bg-white border border-gray-200 hover:bg-plum hover:text-white text-gray-600 flex items-center justify-center cursor-pointer transition-colors text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold text-gray-800 w-4 text-center">
                        {item.qty}
                      </span>
                      <button 
                        onClick={() => onQtyChange(item.id, 1)}
                        className="w-6 h-6 rounded bg-white border border-gray-200 hover:bg-plum hover:text-white text-gray-600 flex items-center justify-center cursor-pointer transition-colors text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 text-gray-400 select-none">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30 text-plum" />
              <h4 className="font-extrabold text-gray-700 text-sm mb-1">Your cart is empty</h4>
              <p className="text-xs text-gray-400 max-w-[220px] mx-auto leading-relaxed">Fill up your basket with premium groceries & household deals today.</p>
            </div>
          )}
        </div>

        {/* Footer actions summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-150 bg-gray-50/50">
            <div className="space-y-2 border-b border-gray-200/60 pb-4 mb-4 text-xs font-bold text-gray-500">
              <div className="flex justify-between">
                <span>Basket Subtotal</span>
                <span className="text-gray-700">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Rider Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wide text-[10px]">
                      FREE
                    </span>
                  ) : (
                    <span className="text-gray-700">{formatMoney(deliveryFee)}</span>
                  )}
                </span>
              </div>
              {deliveryFee > 0 && (
                <div className="text-[10px] text-plum font-semibold">
                  Add {formatMoney(settings.freeDeliveryThreshold - subtotal)} more to qualify for FREE delivery!
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-5">
              <span className="text-sm font-extrabold text-gray-800">Total Due:</span>
              <span className="text-lg font-black text-plum">{formatMoney(total)}</span>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full bg-plum hover:bg-plum-dark text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
