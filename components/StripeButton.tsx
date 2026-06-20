"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/js';

interface StripeButtonProps {
  email?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function StripeButton({ 
  email, 
  label = "Unlock Full Access - $10 USD",
  className = "",
  style = {}
}: StripeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        setError(result.error.message || 'Checkout failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 ${className}`}
        style={style}
      >
        {loading ? 'Processing...' : label}
      </button>
      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}
    </div>
  );
}
