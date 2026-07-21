import React, { useState, useEffect } from 'react';
import { 
  X, User, Award, MapPin, Phone, Mail, Search, 
  CheckCircle, Truck, Package, ShoppingBag, AlertCircle, Sparkles, HelpCircle
} from 'lucide-react';
import { Customer, Order } from '../types';
import { formatMoney, formatDate } from '../data/catalog';

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
  const [phoneInput, setPhoneInput] = useState('');
  const [orderSearchId, setOrderSearchId] = useState('');
  const [searchError, setSearchError] = useState('');
  const [selectedTrackOrder, setSelectedTrackOrder] = useState<Order | null>(null);
  const [showRedeemTooltip, setShowRedeemTooltip] = useState(false);
  const [deliveryProgress, setDeliveryProgress] = useState(25);

  useEffect(() => {
    if (!selectedTrackOrder) return;
    
    if (selectedTrackOrder.status === 'pending') {
      setDeliveryProgress(5);
      return;
    }
    if (selectedTrackOrder.status === 'completed') {
      setDeliveryProgress(100);
      return;
    }
    
    // If en-route (processing), animate continuously from 10% to 90%
    setDeliveryProgress(10);
    const interval = setInterval(() => {
      setDeliveryProgress(prev => {
        if (prev >= 92) return 10;
        return prev + 2;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [selectedTrackOrder?.id, selectedTrackOrder?.status]);

  const getDestinationCoordinates = (city: string) => {
    const c = city.trim().toLowerCase();
    if (c.includes('mombasa')) return { lat: -4.0435, lng: 39.6682 };
    if (c.includes('kisumu')) return { lat: -0.0917, lng: 34.7680 };
    if (c.includes('eldoret')) return { lat: 0.5143, lng: 35.2698 };
    if (c.includes('nakuru')) return { lat: -0.3031, lng: 36.0800 };
    return { lat: -1.2921, lng: 36.8219 };
  };

  const startLat = -1.2863;
  const startLng = 36.8172;
  const dest = selectedTrackOrder ? getDestinationCoordinates(selectedTrackOrder.customer.city) : { lat: -1.2921, lng: 36.8219 };
  const currentLat = startLat + (dest.lat - startLat) * (deliveryProgress / 100);
  const currentLng = startLng + (dest.lng - startLng) * (deliveryProgress / 100);

  // visual percentage positions for truck (Responsive Quadratic Bezier curve)
  const t = deliveryProgress / 100;
  const riderLeft = (1 - t) * (1 - t) * 12 + 2 * (1 - t) * t * 45 + t * t * 88;
  const riderBottom = (1 - t) * (1 - t) * 30 + 2 * (1 - t) * t * 80 + t * t * 75;

  if (!isOpen) return null;

  // Badge configuration based on customer points
  const getBadgeDetails = (pts: number) => {
    if (pts >= 750) {
      return {
        label: 'Loyalty Legend',
        color: 'from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white',
        border: 'border-purple-300 dark:border-purple-800',
        textColor: 'text-purple-600 dark:text-purple-400',
        desc: 'Ultimate VIP Status! Enjoy free delivery and premium support priority dispatch.'
      };
    }
    if (pts >= 300) {
      return {
        label: 'Super Shopper',
        color: 'from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white',
        border: 'border-emerald-300 dark:border-emerald-800',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        desc: 'Valued Regular Customer. Unlocked expedited shipping priority dispatch.'
      };
    }
    if (pts >= 100) {
      return {
        label: 'Silver Saver',
        color: 'from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-650 text-white',
        border: 'border-amber-300 dark:border-amber-800',
        textColor: 'text-amber-600 dark:text-amber-400',
        desc: 'Discounts Contender! Collecting points toward epic free gift baskets.'
      };
    }
    return {
      label: 'Bronze Basket',
      color: 'from-gray-500 to-slate-600 dark:from-gray-650 dark:to-slate-700 text-white',
      border: 'border-gray-200 dark:border-gray-800',
      textColor: 'text-gray-500 dark:text-gray-400',
      desc: 'Savings Starter! Placing orders unlocks silver, super shopper & legend status.'
    };
  };

  // Filter orders for the logged-in customer
  const customerOrders = customer
    ? orders.filter(o => o.customer.phone.trim().toLowerCase() === customer.phone.trim().toLowerCase())
    : [];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;
    onLoginCustomer(phoneInput.trim());
    setPhoneInput('');
    setSearchError('');
  };

  const handleTrackOrderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderSearchId.trim().toUpperCase();
    if (!cleanId) return;

    // Find order matching ID (fully or last 6 characters)
    const found = orders.find(
      o => o.id.toUpperCase() === cleanId || o.id.slice(-6).toUpperCase() === cleanId
    );

    if (found) {
      setSelectedTrackOrder(found);
      setSearchError('');
    } else {
      setSelectedTrackOrder(null);
      setSearchError('Order not found. Please verify your Order ID.');
    }
  };

  // Get status stage for tracking timeline
  const getTrackingStages = (status: Order['status']) => {
    // Stage 1: Pending, Stage 2: Dispatched (processing), Stage 3: Delivered (completed)
    const stages = [
      {
        key: 'pending',
        label: 'Pending',
        desc: 'Gathering fresh items at Supermarket',
        isActive: true,
        isCompleted: status === 'processing' || status === 'completed',
        icon: Package
      },
      {
        key: 'processing',
        label: 'Dispatched',
        desc: 'On the way with Kikapu Rider',
        isActive: status === 'processing' || status === 'completed',
        isCompleted: status === 'completed',
        icon: Truck
      },
      {
        key: 'completed',
        label: 'Delivered',
        desc: 'Arrived at your doorstep safely',
        isActive: status === 'completed',
        isCompleted: status === 'completed',
        icon: CheckCircle
      }
    ];
    return stages;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto animate-scale-up border border-gray-150 dark:border-gray-800 flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-plum/5 dark:bg-plum/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-plum/10 text-plum flex items-center justify-center">
              <User className="w-5.5 h-5.5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-plum dark:text-pink-300 font-nice tracking-tight">Kipchimatt Lounge</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Track orders, manage loyalty points, and check out faster</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          {/* PROFILE VIEW OR LOGIN */}
          {customer ? (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/40 dark:from-gray-800/50 dark:to-gray-900/40 border border-gray-150 dark:border-gray-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200/50 dark:border-gray-850 pb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-nice">{customer.name}</h4>
                  <p className="text-sm text-plum dark:text-pink-400 font-handwriting font-bold -mt-1 mb-1 shadow-none">Welcome back, happy shopping! ✨</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-gray-400" /> {customer.phone}</span>
                    {customer.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gray-400" /> {customer.email}</span>}
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {customer.address}, {customer.city}</span>
                  </div>
                </div>

                <div className="relative flex items-center gap-3 bg-gradient-to-br from-plum/5 to-plum/15 dark:from-plum/10 dark:to-plum/20 border border-plum/25 rounded-xl px-4 py-3 shadow-sm select-none">
                  <Award className="w-8 h-8 text-plum dark:text-pink-400 fill-plum/10" />
                  <div className="text-left">
                    <span className="text-[9px] text-plum/85 dark:text-pink-300 font-black uppercase tracking-wider block">Kipchimatt Club</span>
                    <span className="text-base font-black text-plum dark:text-pink-400 font-nice">{customer.points || 0} pts</span>
                    
                    {/* How to Redeem Interactive Trigger */}
                    <div className="mt-0.5">
                      <button
                        type="button"
                        onMouseEnter={() => setShowRedeemTooltip(true)}
                        onMouseLeave={() => setShowRedeemTooltip(false)}
                        onClick={() => setShowRedeemTooltip(!showRedeemTooltip)}
                        className="flex items-center gap-1 text-[10px] text-plum hover:text-plum-dark dark:text-pink-300 dark:hover:text-white font-extrabold underline decoration-dotted cursor-pointer focus:outline-none"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>How to Redeem</span>
                      </button>
                    </div>
                  </div>

                  {/* How to Redeem Tooltip Overlay */}
                  {showRedeemTooltip && (
                    <div className="absolute right-0 top-full mt-2.5 w-76 bg-white dark:bg-gray-800 border-2 border-plum/30 p-4 rounded-xl shadow-2xl z-50 text-left space-y-2.5 animate-scale-up">
                      <div className="absolute -top-2 right-12 w-4 h-4 bg-white dark:bg-gray-800 border-t-2 border-l-2 border-plum/30 rotate-45" />
                      <h5 className="font-extrabold text-xs text-plum dark:text-pink-300 flex items-center gap-1 border-b border-gray-100 dark:border-gray-700 pb-1 font-nice">
                        <Award className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span>Loyalty Rewards Guide</span>
                      </h5>
                      <div className="text-[11px] font-semibold text-gray-600 dark:text-gray-350 space-y-2 leading-relaxed">
                        <p>
                          🛍️ <strong className="text-gray-800 dark:text-white">Earnings:</strong> Get <span className="text-plum dark:text-pink-400 font-extrabold">1 Loyalty Point</span> for every <strong className="text-gray-800 dark:text-white">Ksh 100 spent</strong> automatically on each order.
                        </p>
                        <p>
                          🎁 <strong className="text-gray-800 dark:text-white">Redemption:</strong> Every <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">10 Points = Ksh 1 discount</span> off your Kikapu grocery purchase at checkout, or exchange points for premium gift baskets at the store counter!
                        </p>
                      </div>
                      <p className="text-[14px] font-handwriting text-plum/90 dark:text-pink-300 font-bold text-center border-t border-gray-100 dark:border-gray-700 pt-1.5">
                        "Shukran for being our esteemed customer!"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* LOYALTY CLUB STATUS BADGE BOX */}
              {(() => {
                const pts = customer.points || 0;
                const badge = getBadgeDetails(pts);
                
                let nextTier = null;
                if (pts < 100) {
                  nextTier = { label: 'Silver Saver', req: 100 - pts };
                } else if (pts < 300) {
                  nextTier = { label: 'Super Shopper', req: 300 - pts };
                } else if (pts < 750) {
                  nextTier = { label: 'Loyalty Legend', req: 750 - pts };
                }

                return (
                  <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-4 rounded-xl space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Your Member Tier:</span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r ${badge.color} shadow-sm`}>
                          {badge.label}
                        </span>
                      </div>
                      
                      {nextTier && (
                        <span className="text-[10px] text-plum dark:text-pink-400 font-black bg-plum/5 dark:bg-plum/10 px-2 py-0.5 rounded-md">
                          {nextTier.req} pts to {nextTier.label}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-600 dark:text-gray-350 font-bold leading-relaxed">
                      {badge.desc}
                    </div>

                    {/* Simple progress bar */}
                    {nextTier && (
                      <div className="space-y-1">
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-plum dark:bg-pink-500 h-full transition-all duration-500"
                            style={{ 
                              width: `${Math.min(100, (pts / (pts + nextTier.req)) * 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="flex justify-between items-center text-xs">
                <p className="text-gray-500 dark:text-gray-400 font-medium">To edit details or collect more points, enter this phone number at checkout.</p>
                <button 
                  onClick={onLogoutCustomer}
                  className="text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer transition-colors"
                >
                  Logout Account
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border border-gray-150 dark:border-gray-800 rounded-2xl p-5 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Access Account Portal</span>
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Pre-fill details at checkout and count your supermarket loyalty rewards.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Enter Registered Phone Number</label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. 0712345678"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-750 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-plum/40"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-plum hover:bg-plum-dark text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer transition-colors"
                  >
                    Retrieve Account
                  </button>
                </form>
              </div>

              <div className="border border-gray-150 dark:border-gray-800 rounded-2xl p-5 bg-gray-50/50 dark:bg-gray-850/50 space-y-4 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-100">Guest Order Lookup</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Have a Kikapu order receipt reference? Enter the ID to see its delivery progress.</p>
                </div>
                <form onSubmit={handleTrackOrderSearch} className="space-y-3">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Receipt / Order ID (e.g. #9A2F8B)"
                      value={orderSearchId}
                      onChange={(e) => setOrderSearchId(e.target.value)}
                      className="w-full text-xs font-semibold pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-750 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-plum/40"
                    />
                    <button 
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-plum"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                  {searchError && (
                    <p className="text-[11px] font-semibold text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{searchError}</span>
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* DYNAMIC TIMELINE COMPONENT FOR DETAILED ORDER TRACKING */}
          {selectedTrackOrder && (
            <div className="border border-amber-200 dark:border-amber-900/60 bg-amber-500/5 dark:bg-amber-950/10 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-amber-200/50 dark:border-amber-900/40 pb-3">
                <div>
                  <span className="text-[9px] bg-plum text-white font-black uppercase px-2 py-0.5 rounded-full tracking-wider inline-block">Order Live Track</span>
                  <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-100 mt-1">Order #{selectedTrackOrder.id.slice(-6).toUpperCase()}</h4>
                </div>
                <button 
                  onClick={() => setSelectedTrackOrder(null)}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  Clear Track
                </button>
              </div>

              {selectedTrackOrder.status === 'cancelled' ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-bold">This order has been cancelled</p>
                    <p className="text-[10px] text-red-500 mt-0.5">Please contact customer support at {orders[0]?.customer.county} offices if this was an error.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pt-2">
                  {/* Order Tracking Timeline Stages */}
                  <div className="grid grid-cols-3 relative">
                    {/* Background Progress Bar Line */}
                    <div className="absolute top-5 left-[16%] right-[16%] h-1 bg-gray-200 dark:bg-gray-800 z-0">
                      <div 
                        className="h-full bg-emerald-600 transition-all duration-500"
                        style={{
                          width: selectedTrackOrder.status === 'pending' ? '0%' : selectedTrackOrder.status === 'processing' ? '50%' : '100%'
                        }}
                      />
                    </div>

                    {getTrackingStages(selectedTrackOrder.status).map((stage, idx) => {
                      const Icon = stage.icon;
                      return (
                        <div key={stage.key} className="flex flex-col items-center text-center z-10">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                            stage.isCompleted 
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
                              : stage.isActive 
                              ? 'bg-amber-500 border-amber-500 text-white animate-pulse shadow'
                              : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="mt-2.5">
                            <span className={`text-xs font-bold block ${stage.isActive ? 'text-gray-800 dark:text-gray-100 font-black' : 'text-gray-400'}`}>
                              {stage.label}
                            </span>
                            <span className="text-[9px] text-gray-400 font-semibold block mt-0.5 leading-tight max-w-[120px] mx-auto hidden sm:block">
                              {stage.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white dark:bg-gray-850 rounded-xl p-3.5 border border-gray-150 dark:border-gray-800 flex justify-between items-center text-xs text-gray-600 dark:text-gray-400 font-semibold shadow-sm">
                    <span>Payment: <strong className="text-gray-800 dark:text-gray-200 uppercase">{selectedTrackOrder.payment}</strong></span>
                    <span>Grand Total: <strong className="text-plum dark:text-pink-400 font-bold">{formatMoney(selectedTrackOrder.total)}</strong></span>
                  </div>

                  {/* PREMIUM VISUAL TRACKING MAP & DELIVERY COORDINATES MODULE */}
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4.5 space-y-4">
                    <div className="flex items-center justify-between text-xs border-b border-gray-200/60 dark:border-gray-800 pb-3">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase block">Expected Arrival</span>
                        <span className="font-extrabold text-gray-800 dark:text-gray-200 text-sm">
                          {selectedTrackOrder.status === 'pending' 
                            ? '45 - 55 Minutes (Awaiting Dispatch)' 
                            : selectedTrackOrder.status === 'processing' 
                            ? '15 - 25 Minutes (En-Route)' 
                            : 'Delivered (Completed)'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 font-bold uppercase block">Rider Assigned</span>
                        <span className="font-bold text-plum dark:text-pink-400">
                          {selectedTrackOrder.status === 'pending' ? 'Scheduling Rider...' : 'Kikapu Express Rider #04'}
                        </span>
                      </div>
                    </div>

                    {/* Highly-styled Live Map Route Mockup */}
                    <div className="relative h-44 bg-blue-50/50 dark:bg-slate-950 rounded-2xl border border-blue-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between p-3 select-none">
                      {/* Grid background lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

                      {/* Map Landmarks & Dynamic Visual Route */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Connecting delivery route path */}
                        <path 
                          d="M 12,70 Q 45,20 88,25" 
                          fill="none" 
                          stroke="var(--plum)" 
                          strokeWidth="3.5" 
                          strokeDasharray="6 4" 
                          vectorEffect="non-scaling-stroke"
                          className="opacity-75"
                        />
                        {/* Fulfilled path if rider has progressed */}
                        {(selectedTrackOrder.status === 'processing' || selectedTrackOrder.status === 'completed') && (
                          <path 
                            d="M 12,70 Q 45,20 88,25" 
                            fill="none" 
                            stroke="var(--green)" 
                            strokeWidth="4" 
                            strokeDasharray={selectedTrackOrder.status === 'completed' ? "0" : "8"}
                            vectorEffect="non-scaling-stroke"
                            className="opacity-90 animate-[dash_2s_linear_infinite]"
                          />
                        )}
                      </svg>

                      {/* Landmark labels */}
                      <div className="absolute bottom-[44px] left-[15px] bg-white/80 dark:bg-gray-950/80 px-2 py-0.5 rounded text-[8px] font-bold text-gray-450 border border-gray-150/50">
                        Kikapu Supermarket Hub
                      </div>
                      <div className="absolute top-[48px] right-[15px] bg-white/80 dark:bg-gray-950/80 px-2 py-0.5 rounded text-[8px] font-bold text-gray-450 border border-gray-150/50">
                        Destination Point
                      </div>

                      {/* Store Marker Pin (Starting Point) */}
                      <div 
                        className="absolute flex flex-col items-center -translate-x-1/2 translate-y-1/2 z-10"
                        style={{ left: '12%', bottom: '30%' }}
                      >
                        <div className="w-8 h-8 rounded-full bg-plum text-white flex items-center justify-center shadow-md border-2 border-white">
                          <Package className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Destination Point Pin (End Point) */}
                      <div 
                        className="absolute flex flex-col items-center -translate-x-1/2 translate-y-1/2 z-10"
                        style={{ left: '88%', bottom: '75%' }}
                      >
                        <div className="w-8 h-8 rounded-full bg-green text-white flex items-center justify-center shadow-md border-2 border-white animate-bounce">
                          <MapPin className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Dynamic Rider Location Marker */}
                      {selectedTrackOrder.status !== 'completed' ? (
                        <div 
                          className="absolute flex flex-col items-center transition-all duration-300 z-10 -translate-x-1/2 translate-y-1/2"
                          style={{
                            left: `${riderLeft}%`,
                            bottom: `${riderBottom}%`
                          }}
                        >
                          <div className="bg-amber-500 text-white p-1.5 rounded-full shadow-lg border border-white animate-pulse">
                            <Truck className="w-4 h-4" />
                          </div>
                          <span className="text-[8px] bg-amber-600 text-white px-1.5 py-0.5 rounded-full font-extrabold mt-1 tracking-wide uppercase shadow">
                            {selectedTrackOrder.status === 'pending' ? 'Disbursing' : `En-Route (${Math.round(deliveryProgress)}%)`}
                          </span>
                        </div>
                      ) : (
                        <div className="absolute right-[14%] top-[12%] flex flex-col items-center z-10">
                          <span className="text-[8px] bg-green text-white px-1.5 py-0.5 rounded-full font-black tracking-wide uppercase shadow">
                            Delivered
                          </span>
                        </div>
                      )}

                      <div className="w-full z-10" />
                      <div className="w-full z-10" />
                    </div>

                    {/* Coordinates Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white dark:bg-gray-850 p-3.5 rounded-xl border border-gray-150 dark:border-gray-800">
                      <div className="space-y-1">
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Supermarket Dispatch Coordinates</span>
                        <div className="font-extrabold text-gray-750 dark:text-gray-300 flex items-center gap-1.5">
                          <span className="inline-block w-2 h-2 rounded-full bg-plum" />
                          <span>1.2863° S, 36.8172° E</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-semibold block">Kikapu Central Cold-Chain Depot</span>
                      </div>
                      
                      <div className="space-y-1 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-150 dark:border-gray-800 sm:pl-3">
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                          <span>Delivery Destination Coordinates</span>
                          {selectedTrackOrder.status === 'processing' && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange animate-ping" />
                          )}
                        </span>
                        <div className="font-extrabold text-gray-750 dark:text-gray-300 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-[10px] text-plum dark:text-pink-300 bg-plum/5 dark:bg-plum/10 px-2 py-1 rounded">
                             <span className="font-black text-[8px] uppercase">Rider Live:</span>
                             <span className="font-mono">{Math.abs(currentLat).toFixed(4)}° S, {Math.abs(currentLng).toFixed(4)}° E</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5 text-gray-500 dark:text-gray-450 text-[10px]">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green" />
                            <span>Destination: {Math.abs(dest.lat).toFixed(4)}° S, {Math.abs(dest.lng).toFixed(4)}° E</span>
                          </div>
                        </div>
                        <span className="text-[9px] text-gray-400 font-semibold block truncate">
                          {selectedTrackOrder.customer.address}, {selectedTrackOrder.customer.city}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ORDERS HISTORY LIST FOR CUSTOMER */}
          {customer && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <ShoppingBag className="w-4.5 h-4.5 text-plum" />
                <span>Your Order History ({customerOrders.length})</span>
              </h4>

              {customerOrders.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
                  <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">No orders found for this phone number.</p>
                  <p className="text-[10px] text-gray-400 mt-1">Start shopping and place your first order to collect rewards!</p>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                  {customerOrders.map(order => (
                    <div 
                      key={order.id} 
                      onClick={() => setSelectedTrackOrder(order)}
                      className={`p-4 border rounded-xl transition-all text-left cursor-pointer flex justify-between items-center ${
                        selectedTrackOrder?.id === order.id 
                          ? 'border-amber-400 bg-amber-500/5 dark:border-amber-800' 
                          : 'border-gray-150 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-750 hover:bg-gray-50 dark:hover:bg-gray-850'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-gray-800 dark:text-gray-100">Order #{order.id.slice(-6).toUpperCase()}</span>
                          <span className="text-[10px] text-gray-400 font-bold">{formatDate(order.date)}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold truncate max-w-[280px]">
                          {order.items.map(item => `${item.name} x${item.qty}`).join(', ')}
                        </p>
                      </div>

                      <div className="text-right space-y-1.5 flex-shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          order.status === 'pending' 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' 
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400'
                            : order.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400'
                        }`}>
                          {order.status === 'processing' ? 'Dispatched' : order.status === 'completed' ? 'Delivered' : order.status}
                        </span>
                        <p className="font-extrabold text-xs text-plum dark:text-pink-400">{formatMoney(order.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
