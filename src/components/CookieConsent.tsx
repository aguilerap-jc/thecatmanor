'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      
      // Apply analytics settings
      if (savedPreferences.analytics) {
        enableAnalytics();
      }
    }
  }, []);

  const enableAnalytics = () => {
    // Enable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const disableAnalytics = () => {
    // Disable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    enableAnalytics();
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    
    setPreferences(necessaryOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    setShowBanner(false);
    disableAnalytics();
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    
    if (preferences.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-elegant z-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-display text-lg font-medium text-deep-charcoal mb-2">
              🍪 We use cookies to enhance your experience
            </h3>
            <p className="text-sm text-ash leading-relaxed">
              We use cookies and similar technologies to analyze website traffic, 
              personalize content, and improve our services. You can choose which 
              cookies to accept below.{' '}
              <Link 
                href="/privacy" 
                className="text-terracotta hover:underline"
              >
                Learn more in our Privacy Policy
              </Link>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
            {/* Cookie Preferences Toggle */}
            <details className="sm:hidden">
              <summary className="cursor-pointer text-sm text-terracotta hover:underline">
                Customize preferences
              </summary>
              <div className="mt-3 space-y-3 p-3 bg-gray-50 rounded">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Necessary (Required)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="rounded border-gray-300 text-terracotta focus:ring-terracotta"
                  />
                  <span className="text-sm">Analytics (Google Analytics)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="rounded border-gray-300 text-terracotta focus:ring-terracotta"
                  />
                  <span className="text-sm">Marketing (Future campaigns)</span>
                </label>
                <button
                  onClick={savePreferences}
                  className="w-full px-4 py-2 bg-terracotta text-white text-sm rounded hover:bg-opacity-90 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </details>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex gap-3">
              <button
                onClick={acceptNecessaryOnly}
                className="px-4 py-2 text-sm border border-gray-300 text-charcoal rounded hover:bg-gray-50 transition-colors"
              >
                Necessary Only
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-terracotta text-white rounded hover:bg-opacity-90 transition-colors"
              >
                Accept All
              </button>
            </div>

            {/* Mobile Buttons */}
            <div className="sm:hidden flex gap-3">
              <button
                onClick={acceptNecessaryOnly}
                className="flex-1 px-4 py-2 text-sm border border-gray-300 text-charcoal rounded hover:bg-gray-50 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 px-4 py-2 text-sm bg-terracotta text-white rounded hover:bg-opacity-90 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
