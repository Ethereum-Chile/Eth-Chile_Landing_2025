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
          className="relative px-6 py-2 rounded-lg font-semibold transition-all duration-300 overflow-hidden group bg-red-500/20 hover:bg-red-500/30 text-white backdrop-blur-md border border-red-400/30 hover:border-red-400/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          style={{
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Shiny hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          
          {/* Button text */}
          <span className="relative z-10">
            Disconnect
          </span>
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
        className={`relative px-6 py-2 rounded-lg font-semibold transition-all duration-300 overflow-hidden group ${
          isLoading
            ? 'bg-gray-400/10 text-gray-400 cursor-not-allowed backdrop-blur-sm border border-gray-400/20'
            : 'bg-transparent hover:bg-white/5 text-white backdrop-blur-md border border-white/40 hover:border-white/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]'
        }`}
        style={{
          boxShadow: isLoading ? 'none' : '0 4px 15px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Frosted glass background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-lg"></div>
        
        {/* Shiny hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-lg"></div>
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        
        {/* Button text */}
        <span className="relative z-10 text-white font-medium">
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </span>
      </button>
      {error && (
        <div className="text-red-400 text-xs mt-1 text-center max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
} 