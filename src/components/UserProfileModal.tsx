import React, { useState } from 'react';
import { X, User, Package, LogOut } from 'lucide-react';
import { Customer, Order } from '../types';
import { formatMoney } from '../data/catalog';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  orders: Order[];
  onLoginCustomer: (phone: string) => void;
  onLogoutCustomer: () => void;
}

export default function UserProfileModal({
  isOpen,
  onClose,
  customer,
  orders,
  onLoginCustomer,
  onLogoutCustomer
}: UserProfileModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    onLoginCustomer(phone);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-plum" />
            <span>Customer Account</span>
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {customer ? (
          <div className="space-y-4 text-xs">
            <div className="bg-plum/10 p-4 rounded-2xl space-y-1">
              <h3 className="font-extrabold text-sm text-plum">{customer.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">📱 {customer.phone}</p>
              {customer.email && <p className="text-gray-600 dark:text-gray-300">✉️ {customer.email}</p>}
            </div>

            <div className="space-y-2">
              <h4 className="font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Package className="w-4 h-4 text-plum" />
                <span>My Orders</span>
              </h4>
              {orders.length === 0 ? (
                <p className="text-gray-400 italic">No order history found.</p>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white">#{o.id}</span>
                      <span className="text-[10px] text-gray-400 block">{o.date}</span>
                    </div>
                    <span className="font-black text-plum">{formatMoney(o.total)}</span>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={onLogoutCustomer}
              className="w-full bg-gray-100 dark:bg-gray-800 text-red-600 font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-3 text-xs">
            <h3 className="font-extrabold text-gray-800 dark:text-gray-200">Sign in to your Kipchimatt Account</h3>
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
              placeholder="Phone Number *"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 font-semibold"
            />
            <input
              type="email"
              placeholder="Email Address (Optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 font-semibold"
            />
            <button
              type="submit"
              className="w-full bg-plum hover:bg-plum-dark text-white font-black py-3 rounded-2xl uppercase tracking-wider cursor-pointer shadow-md"
            >
              Save Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
