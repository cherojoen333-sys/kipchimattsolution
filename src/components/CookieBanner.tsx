import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Cookie, ShieldCheck, Check, Settings, X, ChevronDown, ChevronUp, Lock, Sparkles } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Check if user already consented in this session or previously
    const consent = localStorage.getItem('kipchimatt_cookie_consent');
    if (consent) {
      setIsVisible(false);
    }

    const handleOpen = () => {
      setIsVisible(true);
      setShowCustomize(true);
    };

    window.addEventListener('open-cookie-banner', handleOpen);
    return () => window.removeEventListener('open-cookie-banner', handleOpen);
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('kipchimatt_cookie_consent', JSON.stringify(fullConsent));
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('kipchimatt_cookie_consent', JSON.stringify(essentialOnly));
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    const customConsent = {
      ...preferences,
      necessary: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('kipchimatt_cookie_consent', JSON.stringify(customConsent));
    setIsVisible(false);
  };

  if (!isVisible) {
    return createPortal(
      <button
        onClick={() => {
          setIsVisible(true);
          setShowCustomize(true);
        }}
        className="fixed bottom-4 left-4 z-[9999] bg-plum text-white border-2 border-white/30 rounded-full px-3 py-1.5 shadow-2xl flex items-center gap-2 hover:bg-plum-dark transition-all hover:scale-105 active:scale-95 cursor-pointer font-extrabold text-xs"
        title="Cookie Preferences"
      >
        <Cookie className="w-4 h-4" />
        <span className="hidden sm:inline">Cookie Preferences</span>
      </button>,
      document.body
    );
  }

  return createPortal(
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 left-3 sm:left-auto max-w-sm sm:max-w-md w-full z-[9999] animate-slide-up pointer-events-auto">
      <div className="bg-plum text-white border-2 border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-4 sm:p-5 relative overflow-hidden backdrop-blur-xl">
        {/* Ambient background glows */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/25 rounded-full blur-xl pointer-events-none" />

        {/* Header Title & Cookie Icon */}
        <div className="flex items-start justify-between gap-3 relative z-10 text-left">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white text-plum flex items-center justify-center flex-shrink-0 shadow-lg mt-0.5">
              <Cookie className="w-5 h-5 sm:w-6 sm:h-6 fill-plum/15 text-plum" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white leading-tight">
                  We Value Your Privacy
                </h3>
                <span className="text-[9px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                  Kipchimatt
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-white/90 font-medium mt-1 leading-snug">
                Kipchimatt Supermarket uses cookies to secure your M-Pesa payments, save your shopping basket, and deliver personalized grocery deals in under 90 minutes.
              </p>
            </div>
          </div>

          <button
            onClick={handleAcceptEssential}
            className="text-white/70 hover:text-white p-1 rounded-xl hover:bg-white/15 transition-colors cursor-pointer flex-shrink-0"
            title="Close & accept essential cookies"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Detailed Preferences Accordion */}
        {showCustomize && (
          <div className="mt-4 pt-3.5 border-t border-white/20 space-y-2.5 text-xs animate-fade-in relative z-10 text-left">
            <p className="text-[11px] text-white/90 font-medium">
              Manage your cookie preferences below. Essential cookies are required for site security and shopping cart functions:
            </p>

            {/* Category 1: Essential */}
            <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white/10 rounded-xl border border-white/15">
              <div className="pr-2">
                <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Strictly Necessary</span>
                </div>
                <p className="text-[10px] text-white/75 mt-0.5">Shopping cart, account security & M-Pesa payment validation.</p>
              </div>
              <span className="text-[9px] font-black text-plum bg-white px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0 shadow-sm flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span>Always On</span>
              </span>
            </div>

            {/* Category 2: Analytics */}
            <label className="flex items-center justify-between p-2.5 sm:p-3 bg-white/10 rounded-xl border border-white/15 cursor-pointer hover:bg-white/15 transition-colors">
              <div className="pr-2">
                <div className="font-bold text-white text-xs">Analytics & Performance</div>
                <p className="text-[10px] text-white/75 mt-0.5">Measures page load speeds & optimizes 90-minute delivery routing.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="rounded border-white/40 text-plum focus:ring-white w-4 h-4 cursor-pointer flex-shrink-0 accent-white"
              />
            </label>

            {/* Category 3: Marketing */}
            <label className="flex items-center justify-between p-2.5 sm:p-3 bg-white/10 rounded-xl border border-white/15 cursor-pointer hover:bg-white/15 transition-colors">
              <div className="pr-2">
                <div className="font-bold text-white text-xs">Personalized Offers & Deals</div>
                <p className="text-[10px] text-white/75 mt-0.5">Delivers tailored branch discounts and personalized recommendations.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="rounded border-white/40 text-plum focus:ring-white w-4 h-4 cursor-pointer flex-shrink-0 accent-white"
              />
            </label>
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center gap-2 relative z-10 text-left">
          {showCustomize ? (
            <button
              onClick={handleSaveCustom}
              className="flex-1 bg-white text-plum hover:bg-white/90 font-extrabold text-xs py-2.5 px-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <Check className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-white text-plum hover:bg-white/90 font-extrabold text-xs py-2.5 px-3 sm:px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <Check className="w-4 h-4" />
                <span>Accept All</span>
              </button>

              <button
                onClick={handleAcceptEssential}
                className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-colors cursor-pointer border border-white/25"
              >
                Essential Only
              </button>
            </>
          )}

          <button
            onClick={() => setShowCustomize(!showCustomize)}
            className="text-white/90 hover:text-white font-bold text-xs py-2.5 px-2.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/15"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{showCustomize ? 'Hide' : 'Customize'}</span>
            {showCustomize ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}




