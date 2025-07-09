"use client";

import { useState, useEffect } from 'react';

export function ConnectWallet() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        setError('MetaMask is not installed. Please install MetaMask to connect your wallet.');
        return;
      }

      // Request account access
      const accounts = await (window.ethereum as any).request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        // Redirect to profile page after successful connection
        setTimeout(() => {
          window.location.href = '/profile';
        }, 1000);
      }
    } catch (error) {
      console.error('Connection error:', error);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  const getUserDisplay = () => {
    if (account) {
      return account.slice(0, 6) + '...' + account.slice(-4);
    }
    return 'User';
  };

  // Show authenticated state
  if (account) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white text-sm">
          {getUserDisplay()}
        </span>
        <button
          onClick={disconnectWallet}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Show connect button
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={connectWallet}
        disabled={isLoading}
        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
          isLoading
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-white hover:bg-gray-100 text-black'
        }`}
      >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {error && (
        <div className="text-red-400 text-xs mt-1 text-center max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
} 