import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck } from 'lucide-react';
import { CartItem, StoreSettings } from '../types';
import { formatMoney } from '../data/catalog';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  settings: StoreSettings;
  deliveryLocation: string;
  onPlaceOrder: (customer: any, payment: string, notes: string) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  settings,
  deliveryLocation,
  onPlaceOrder
}: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('mpesa');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = subtotal >= (settings.freeDeliveryThreshold || 3000) ? 0 : (settings.deliveryFee || 250);
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please complete all required fields.');
      return;
    }
    onPlaceOrder(
      { name, phone, email, address, city: deliveryLocation, county: deliveryLocation },
      payment,
      notes
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-plum" />
            <span>Express Checkout</span>
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <input
            type="text"
            placeholder="Full Name *"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 font-semibold"
          />
          <input
            type="tel"
            placeholder="Phone Number (M-PESA) *"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 font-semibold"
          />
          <input
            type="text"
            placeholder="Delivery Address *"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 font-semibold"
          />

          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl font-bold space-y-1">
            <div className="flex justify-between"><span>Subtotal:</span><span>{formatMoney(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery:</span><span>{deliveryFee === 0 ? 'FREE' : formatMoney(deliveryFee)}</span></div>
            <div className="flex justify-between text-sm font-black text-plum pt-1 border-t border-gray-200 dark:border-gray-700">
              <span>Total Payable:</span><span>{formatMoney(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-plum hover:bg-plum-dark text-white font-black py-3 rounded-2xl uppercase tracking-wider cursor-pointer shadow-lg"
          >
            Confirm & Pay {formatMoney(total)}
          </button>
        </form>
      </div>
    </div>
  );
}
