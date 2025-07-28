# ETH Chile 2025 - Project TODO List

## ✅ Completed Tasks

### 🧭 Navigation & Interaction

- [x] **Fix carousel navigation**: Sections scroll based on scroll position
- [x] **Implement smooth scroll behavior**
- [x] **Sync navigation with scroll position**
- [x] **Test on all viewport sizes**
- [x] **Remove console.log statements** - Clean console output
- [x] **Restore original hover gallery layout** for SponsorshipTiersAnimated

### 📂 Sponsored Deck

- [x] **Make "Download Sponsor Deck" button functional** - Button exists but needs file hosting

### 🎯 Hero Sections

- [x] **Add unhover animation to all section titles**
- [x] **Implement smooth transition effects**
- [x] **Test hover/unhover states**

### 🔐 Authentication

- [x] **Privy authentication implementation** - Already implemented and working

---

## Top Priority Tasks

### 📂 Sponsored Deck Google Drive Link

- [ ] **Add Google Drive link to sponsor deck button**
  - [ ] Upload sponsor deck PDF to Google Drive
  - [ ] Set sharing permissions to "Anyone with the link can view"
  - [ ] Update download button in SponsorshipTiersAnimated.tsx to link to Google Drive URL
  - [ ] Test download functionality across browsers
  - [ ] Add download tracking/analytics (Google Analytics event)

### CTA Button Update - "Quiero ser Speaker"

- [ ] **Update Hero CTA button text to "Quiero ser Speaker"**
  - [ ] Link with smooth scrool to the speaker application form in SocialProof section
  - [ ] Test button functionality and navigation
  - [ ] Ensure responsive design across devices

### 🏢 Trusted by Industry Leaders - Logo Updates

- [ ] **Update logos to white versions of:**
  - [ ] Polkadot logo (white version)
  - [ ] Worldcoin logo (white version)
  - [ ] Ethereum logo (white version)
  - [ ] Optimism logo (white version)
  - [ ] Crecimiento logo (white version)
  - [ ] Mantle Network logo (white version)
  - [ ] Base logo (white version)
  - [ ] Ethereum Foundation logo (white version)
- [ ] **Ensure consistent sizing and spacing**
- [ ] **Test responsive behavior across devices**
- [ ] **Add proper alt text for accessibility**

### Hero Section Updates

- [ ] Optimize for web performance (WebP format, responsive sizes)
- [ ] update images with more images from eth chile 2024
- [ ] Ensure responsive behavior across devices

### Profile Creation UI Accessibility

- [ ] **Fix profile creation flow visibility issues**
  - [ ] Improve text color contrast for better readability
  - [ ] Fix button visibility and styling
  - [ ] Ensure form fields are clearly visible
  - [ ] Add proper focus states for accessibility
  - [ ] Test with screen readers
  - [ ] Add loading states and error messages
  - [ ] Improve mobile responsiveness

### 🗄️ Supabase Database Integration

- [ ] **Set up Supabase project**
  - [ ] Create new Supabase project at supabase.com
  - [ ] Configure environment variables:
    - `SUPABASE_URL`
    - `SUPABASE_ANON_KEY`
    - `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] Set up Row Level Security (RLS) policies
- [ ] **Database schema design**
  - [ ] Create `users` table:
    - id (uuid, primary key)
    - email (text, unique)
    - wallet_address (text, nullable)
    - created_at (timestamp)
    - updated_at (timestamp)
  - [ ] Create `tickets` table:
    - id (uuid, primary key)
    - user_id (uuid, foreign key)
    - ticket_type (text)
    - price (decimal)
    - status (text: 'pending', 'paid', 'cancelled')
    - qr_code (text)
    - payment_method (text: 'stripe', 'crypto')
    - transaction_hash (text, nullable)
    - created_at (timestamp)
  - [ ] Create `payments` table:
    - id (uuid, primary key)
    - user_id (uuid, foreign key)
    - ticket_id (uuid, foreign key)
    - amount (decimal)
    - currency (text)
    - payment_method (text)
    - status (text: 'pending', 'completed', 'failed')
    - transaction_hash (text, nullable)
    - created_at (timestamp)
- [ ] **User authentication flow**
  - [x] **Privy authentication** - Already implemented
  - [ ] Create user profile management
  - [ ] Add session management and persistence
  - [ ] Link Privy user to Supabase profile

### 📧 Email System

- [ ] **Set up email service**
  - [ ] Integrate Resend
  - [ ] Configure email templates:
    - Welcome email with wallet connection instructions
    - Payment confirmation with ticket details
    - Event reminders
    - Ticket validation instructions

### 👥 Teams & Profiles

- [ ] **Update team images**
  - [ ] Source high-quality profile photos
  - [ ] Ensure consistent sizing and style
- [ ] **Get profile creation flow working**
  - [x] **Connect wallet functionality** - Privy already implemented
  - [ ] Create profile form with improved UI
  - [ ] Save to Supabase database

---

## Footer Fixes

### Footer Visual Updates

### 🔗 Footer Functionality

- [ ] **Fix contact form/forum in the footer**
  - [ ] Implement working contact form
  - [ ] Add form validation
  - [ ] Connect to email service
- [ ] **Update all footer links**
  - [ ] Social media links
  - [ ] Navigation links
  - [ ] External resources

---

## Hackathon Section

### Visual Updates

- [ ] **Update Hackathons section**
  - [ ] Ensure clean, accurate information display
  - [ ] Test responsive behavior
  - [ ] Ensure links work and are correct

---

## 🚧 Coming Soon / Later Tasks

### 🎫 Ticket Management Features

- [ ] **Ticket validation system**
  - [ ] Create QR code scanner for event entry
  - [ ] Implement ticket status checking
  - [ ] Add ticket transfer functionality
  - [ ] Create admin dashboard for ticket management
- [ ] **User dashboard**
  - [ ] Display purchased tickets
  - [ ] Show payment history
  - [ ] Allow ticket transfers
  - [ ] Provide event information and updates

### 💳 Payment Integration - Ticket Purchase Flow

- [ ] **Design and implement ticket purchase interface**
  - [ ] Create ticket types:
    - Early Bird ($50) - Limited availability
    - General Admission ($75) - Standard ticket
    - VIP ($150) - Premium access, exclusive events
    - Student ($25) - Valid student ID required
  - [ ] Design ticket selection component with pricing display
  - [ ] Add quantity selector and total calculation
  - [ ] Implement discount codes system
  - [ ] Add Stripe integration for fiat payments
  - [ ] Create payment confirmation flow
  - [ ] Add payment error handling and retry logic
  - [ ] Implement email delivery system for tickets

### 💳 Payment Integration - Crypto Payment Listener

- [ ] **Implement crypto payment listening system**
  - [ ] Set up ETH Chile wallet address for payments
  - [ ] Add QR code generator for wallet address
  - [ ] Add copy address button with clipboard functionality
  - [ ] Implement blockchain transaction listener:
    - Monitor transactions to ETH Chile wallet address
    - Match transaction amount with ticket prices
    - Verify sender wallet address
    - Check transaction confirmation status
  - [ ] Create payment verification system:
    - Auto-detect successful payments
    - Match payment amount to ticket type
    - Create ticket automatically on payment confirmation
    - Send confirmation email with ticket details
  - [ ] Add payment status tracking:
    - Pending payment status
    - Payment confirmation
    - Ticket generation
    - Error handling for failed payments

---

## 📋 Project Management

### Current Sprint Goals

- [ ] Complete all Top Priority Tasks
- [ ] Test navigation functionality
- [ ] Ensure responsive design across devices
- [ ] Optimize performance

## 📝 Notes

### Design Guidelines

- Maintain consistent visual aesthetic
- Ensure accessibility standards
- Optimize for mobile experience
- Follow web3/blockchain design trends

---

_Last Updated: December 2024_
_Project: ETH Chile 2025_
_Status: In Development - Ready for Payment Integration Implementation_
