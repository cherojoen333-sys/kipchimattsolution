import React, { useState, useEffect } from 'react';
import { ShieldCheck, Info, X, Check, Lock, ToggleLeft, ToggleRight, Settings } from 'lucide-react';
import { CookiePreferences } from '../types';

// Cookie helper utilities
export function setBrowserCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
}

export function getBrowserCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

export function deleteBrowserCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

interface CookieConsentProps {
  onConsentChange?: (prefs: CookiePreferences) => void;
  forceOpenTrigger?: boolean;
  onCloseForceTrigger?: () => void;
}

export default function CookieConsent({ 
  onConsentChange, 
  forceOpenTrigger = false,
  onCloseForceTrigger
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  // Check if consent has already been given on mount
  useEffect(() => {
    const savedConsent = getBrowserCookie('kipchimatt_cookie_consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
        if (onConsentChange) onConsentChange(parsed);
      } catch (err) {
        console.warn('Could not parse cookie consent cookie, showing banner:', err);
        setIsVisible(true);
      }
    } else {
      // Show the banner with a slight delay for beautiful entrance feel
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // React to forced trigger (e.g. from footer settings button)
  useEffect(() => {
    if (forceOpenTrigger) {
      const savedConsent = getBrowserCookie('kipchimatt_cookie_consent');
      if (savedConsent) {
        try {
          setPreferences(JSON.parse(savedConsent));
        } catch (e) {}
      }
      setShowDetailsModal(true);
    }
  }, [forceOpenTrigger]);

  const handleAcceptAll = () => {
    const allPrefs: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    setPreferences(allPrefs);
    setBrowserCookie('kipchimatt_cookie_consent', JSON.stringify(allPrefs), 365);
    setIsVisible(false);
    setShowDetailsModal(false);
    if (onConsentChange) onConsentChange(allPrefs);
    if (onCloseForceTrigger) onCloseForceTrigger();
  };

  const handleDeclineAll = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    setPreferences(essentialOnly);
    setBrowserCookie('kipchimatt_cookie_consent', JSON.stringify(essentialOnly), 365);
    setIsVisible(false);
    setShowDetailsModal(false);
    if (onConsentChange) onConsentChange(essentialOnly);
    if (onCloseForceTrigger) onCloseForceTrigger();
  };

  const handleSavePreferences = () => {
    setBrowserCookie('kipchimatt_cookie_consent', JSON.stringify(preferences), 365);
    setIsVisible(false);
    setShowDetailsModal(false);
    if (onConsentChange) onConsentChange(preferences);
    if (onCloseForceTrigger) onCloseForceTrigger();
  };

  if (!isVisible && !showDetailsModal) return null;

  return (
    <>
      {/* 1. BOTTOM BANNER LAYER */}
      {isVisible && !showDetailsModal && (
        <div 
          id="cookie-consent-banner"
          className="fixed bottom-0 left-0 right-0 w-full bg-plum text-white border-t border-plum-light/30 shadow-[0_-10px_40px_rgba(74,16,40,0.35)] z-[9999] p-4 md:p-6 animate-slide-up animate-duration-300"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            <div className="flex items-start gap-3.5 flex-1">
              <div className="bg-white/10 p-2.5 rounded-xl shrink-0 text-white mt-0.5">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white tracking-tight flex flex-wrap items-center gap-2">
                  <span>How Kipchimatt Uses Cookies</span>
                  <span className="bg-white/20 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold tracking-wider">
                    Privacy Guarantee
                  </span>
                </h4>
                <p className="text-[11px] text-white/90 leading-relaxed max-w-5xl">
                  To deliver Kenya's freshest online grocery catalog, we store cookies in your browser. Essential cookies keep your shopping basket, wishlist, and administrative login intact, while functional cookies remember your county location preference to speed up delivery calculations.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0 justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10">
              <button
                id="cookie-btn-settings"
                onClick={() => setShowDetailsModal(true)}
                className="text-white/90 hover:text-white bg-white/10 hover:bg-white/20 text-[10px] font-extrabold px-3 py-2 rounded-xl cursor-pointer transition-colors flex items-center gap-1 mr-auto lg:mr-0"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
              
              <button
                id="cookie-btn-decline"
                onClick={handleDeclineAll}
                className="bg-plum-dark/40 hover:bg-plum-dark/60 text-white/90 font-extrabold text-[10px] px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors border border-white/10"
              >
                Essential Only
              </button>
              
              <button
                id="cookie-btn-accept"
                onClick={handleAcceptAll}
                className="bg-white hover:bg-white/95 text-plum font-black text-[10px] px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md flex items-center gap-1 hover:scale-[1.02] active:scale-95"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept All Cookies</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. DETAILED PREFERENCES MODAL */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            id="cookie-details-modal"
            className="bg-white dark:bg-gray-900 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col gap-6 animate-zoom-in overflow-hidden max-h-[90vh]"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="bg-plum/10 dark:bg-plum/20 p-2 rounded-xl text-plum dark:text-yellow">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Cookie Preferences Manager</h3>
                  <p className="text-[11px] text-gray-500 font-bold">Configure how your data is handled locally</p>
                </div>
              </div>
              {onCloseForceTrigger && (
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    onCloseForceTrigger();
                  }}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer text-gray-400 hover:text-gray-700 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-950/60 p-3 rounded-2xl border border-gray-100 dark:border-gray-800/80">
              We respect your local data privacy. Select which cookie categories you want to authorize. Declining categories may disable custom settings (like auto-saving dark mode or pre-selecting your county).
            </p>

            {/* Preference Categories list */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              
              {/* Category 1: Essential */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-2xl border border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <span>Strictly Essential Cookies</span>
                    <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[9px] px-1.5 py-0.5 rounded-md uppercase font-black tracking-wider flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> Required
                    </span>
                  </span>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Saves your active supermarket basket (cart), items in your Wishlist, customer profile points tracking, liquor age gate eligibility status, and your cookie consent settings.
                  </p>
                </div>
                <div className="text-gray-400 py-1 shrink-0">
                  <ToggleRight className="w-9 h-9 text-plum dark:text-yellow opacity-60" />
                </div>
              </div>

              {/* Category 2: Functional */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-2xl border border-gray-100 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-950/20 transition-all">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-gray-900 dark:text-white">
                    Functional & Personalization Cookies
                  </span>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Allows the app to remember your selected Delivery County, automatic dark/light theme choice, and custom font size/high-contrast accessibility configurations across sessions.
                  </p>
                </div>
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, functional: !prev.functional }))}
                  className="text-gray-400 py-1 cursor-pointer transition-transform duration-200 shrink-0"
                >
                  {preferences.functional ? (
                    <ToggleRight className="w-9 h-9 text-green-dark" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 text-gray-300 dark:text-gray-600" />
                  )}
                </button>
              </div>

              {/* Category 3: Analytics */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-2xl border border-gray-100 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-950/20 transition-all">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-gray-900 dark:text-white">
                    Analytics & Performance Cookies
                  </span>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Collects anonymous operational data including storefront speed, searched brand keyword trends, and active category browsing patterns. This helps our team optimize the server capacity.
                  </p>
                </div>
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                  className="text-gray-400 py-1 cursor-pointer transition-transform duration-200 shrink-0"
                >
                  {preferences.analytics ? (
                    <ToggleRight className="w-9 h-9 text-green-dark" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 text-gray-300 dark:text-gray-600" />
                  )}
                </button>
              </div>

              {/* Category 4: Marketing */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-2xl border border-gray-100 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-950/20 transition-all">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-gray-900 dark:text-white">
                    Marketing & Targeted Suggestion Cookies
                  </span>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Tracks the success of newsletter signups and enables smart, personalized grocery recommendations matching your shopping history.
                  </p>
                </div>
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                  className="text-gray-400 py-1 cursor-pointer transition-transform duration-200 shrink-0"
                >
                  {preferences.marketing ? (
                    <ToggleRight className="w-9 h-9 text-green-dark" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 text-gray-300 dark:text-gray-600" />
                  )}
                </button>
              </div>

            </div>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">
              <button
                onClick={handleDeclineAll}
                className="w-full sm:w-auto sm:mr-auto text-gray-600 dark:text-gray-400 hover:text-red text-xs font-bold py-2 px-4 cursor-pointer hover:underline text-center"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleSavePreferences}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer transition-colors text-center"
              >
                Save Selected
              </button>
              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto bg-plum hover:bg-plum-dark dark:bg-yellow dark:hover:bg-yellow/90 text-white dark:text-black font-black text-xs px-6 py-3 rounded-xl cursor-pointer transition-all shadow-md text-center"
              >
                Allow All Cookies
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
