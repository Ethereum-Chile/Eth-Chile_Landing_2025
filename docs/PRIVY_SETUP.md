# Privy Wallet Integration Setup

## Overview

This project integrates Privy for wallet authentication, allowing users to connect with email or MetaMask wallet and pay with fiat or crypto.

## Setup Instructions

### 1. Create a Privy Account

1. Go to [Privy Console](https://console.privy.io/)
2. Sign up and create a new application
3. Get your App ID from the dashboard

### 2. Environment Configuration

Create a `.env` file in the root directory with:

```env
PUBLIC_PRIVY_APP_ID=your-privy-app-id-here
```

**Note**: In Astro, environment variables that should be available in the browser must be prefixed with `PUBLIC_`.

### 3. Features Implemented

#### Wallet Connection

- **Email Login**: Users can sign in with their Gmail account
- **MetaMask Integration**: Direct wallet connection
- **Multiple Chains**: Supports Ethereum, Polygon, and Optimism

#### User Flow

1. User clicks "Connect Wallet" in the header
2. Privy modal opens with email and wallet options
3. After successful authentication, user is redirected to `/profile`
4. User completes their profile creation
5. Each authenticated user gets a personal profile page

#### Payment Options

- **Fiat Payments**: Credit card, bank transfer
- **Crypto Payments**: ETH, USDC, USDT on supported chains

### 4. Components

#### PrivyProvider.tsx

- Wraps the entire app with Privy authentication
- Handles user authentication state
- Redirects to profile page after successful login

#### ConnectWallet.tsx

- Displays connect/disconnect button in header
- Shows user info when connected
- Handles loading states

#### Profile Page

- Located at `/profile`
- Form for user profile creation
- Professional styling with glassmorphism effects

### 5. Styling

- Dark theme with glassmorphism effects
- Responsive design for mobile and desktop
- Consistent with ETHChile branding

### 6. Security

- Client-side authentication with Privy
- Secure wallet connections
- Environment variable protection

## Next Steps

1. Set up your Privy App ID in the `.env` file
2. Test the wallet connection flow
3. Customize the profile form as needed
4. Add additional payment processing if required

## Troubleshooting

If you see "Wallet Coming Soon" instead of the connect button:

1. Make sure you've created a `.env` file with `PUBLIC_PRIVY_APP_ID=your-actual-app-id`
2. Restart the development server after adding the environment variable
3. Check the browser console for any Privy-related errors
