"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F0EDE6" }}>
      <div className="max-w-md w-full px-6 py-12 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-2" style={{ color: "#888880" }}>
          Welcome to PracticaEnglish!
        </p>
        <p className="text-sm mb-8" style={{ color: "#888880" }}>
          Your access is now active. Start practicing industry-specific English immediately.
        </p>
        
        {sessionId && (
          <p className="text-xs mb-8" style={{ color: "#2B5CE6" }}>
            Session ID: {sessionId}
          </p>
        )}

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all hover:opacity-90"
          style={{ backgroundColor: "#2B5CE6", color: "#F0EDE6" }}
        >
          Start Learning →
        </Link>
      </div>
    </div>
  );
}
