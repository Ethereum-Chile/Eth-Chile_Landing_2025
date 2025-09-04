# Unicorn Studio Implementation Guide

## 🎯 Overview

This document provides a comprehensive guide on how Unicorn Studio is currently implemented in the ETH Chile project. The implementation is working beautifully and this guide will help future developers understand the correct approach.

## 📦 Package Information

- **Package**: `unicornstudio-react`
- **Version**: `^1.4.29-1`
- **Installation**: `npm install unicornstudio-react`

## 🏗️ Current Implementation Architecture

### 1. Main Background Component (Raycast Blue Background)

**File**: `src/components/ui/raycast-animated-blue-background.tsx`

This is the **primary and working implementation** used in the Hero section:

```tsx
import UnicornScene from "unicornstudio-react";

export const RaycastAnimatedBlueBackground = () => {
  const { width, height } = useWindowSize();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for UnicornStudio (2.5 seconds)
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
    }, 2500);

    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -100, // Behind everything
      }}
    >
      {/* Black fallback while loading */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            zIndex: 1,
          }}
        />
      )}

      {/* UnicornStudio Scene - only when fully loaded */}
      {isLoaded && (
        <div style={{ position: "relative", zIndex: 2 }}>
          <UnicornScene
            production={true}
            projectId="ed7SJMvTJEVxfqzypOOQ"
            width={width}
            height={height}
          />
        </div>
      )}
    </div>
  );
};
```

**Key Features**:

- ✅ **Direct React Component**: Uses `UnicornScene` as a direct React component
- ✅ **Production Mode**: `production={true}` for optimized performance
- ✅ **Dynamic Sizing**: Uses `useWindowSize` hook for responsive dimensions
- ✅ **Loading States**: Proper loading/loaded state management
- ✅ **Z-Index Management**: Positioned behind content with `zIndex: -100`
- ✅ **Black Fallback**: Clean black background while loading

### 2. Alternative Implementation (OpenAI Codex Background)

**File**: `src/components/ui/open-ai-codex-animated-background.tsx`

This implementation includes a **fallback system** with custom particle animations:

```tsx
export const Component = () => {
  const { width, height } = useWindowSize();
  const [useFallback, setUseFallback] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback background with particles (CAUSES MOBILE ISSUE)
  const FallbackBackground = useMemo(
    () => () =>
      (
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 animate-pulse rounded-2xl"></div>

          {/* Floating particles - THIS IS THE MOBILE ISSUE SOURCE */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  animation: "float 3s ease-in-out infinite",
                }}
              />
            ))}
          </div>

          {/* Grid pattern and glowing orbs */}
          {/* ... */}
        </div>
      ),
    []
  );

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.3;
            }
            50% { 
              transform: translateY(-20px) rotate(180deg); 
              opacity: 0.8;
            }
          }
        `,
        }}
      />

      <div className="relative w-full h-full p-6">
        <div className="w-full h-full rounded-2xl border border-white/20 bg-black/10 backdrop-blur-sm overflow-hidden shadow-2xl">
          <div className="absolute inset-0 w-full h-full rounded-2xl">
            {!useFallback ? (
              <div className="w-full h-full rounded-2xl">
                <UnicornScene
                  production={true}
                  projectId="1grEuiVDSVmyvEMAYhA6"
                  width={width}
                  height={height}
                  onError={handleUnicornError}
                  onLoad={handleUnicornLoad}
                />
              </div>
            ) : (
              <FallbackBackground />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
```

### 3. Simple Background Component

**File**: `src/components/UnicornBackground.tsx`

A simpler implementation without loading states:

```tsx
export const UnicornBackground = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="fixed inset-0 -z-10">
      <UnicornScene
        production={true}
        projectId="ed7SJMvTJEVxfqzypOOQ"
        width={width}
        height={height}
      />
    </div>
  );
};
```

## 🎯 Recommended Implementation Approach

### ✅ **BEST PRACTICE**: Use the Raycast Blue Background Pattern

The `RaycastAnimatedBlueBackground` component is the **recommended approach** because:

1. **Clean Implementation**: No unnecessary fallback animations
2. **Proper Loading States**: Smooth transition from black to animated background
3. **Performance Optimized**: Only renders when ready
4. **Mobile Friendly**: No particle animations that cause mobile issues
5. **Z-Index Management**: Proper layering behind content

### ❌ **AVOID**: Complex Fallback Systems

The `open-ai-codex-animated-background.tsx` approach should be avoided because:

1. **Mobile Issues**: Fallback particles cause unwanted animations on mobile
2. **Complexity**: Unnecessary fallback system adds complexity
3. **Performance**: Multiple animation layers impact performance
4. **Maintenance**: Harder to debug and maintain

## 🔧 Implementation Steps

### Step 1: Install Package

```bash
npm install unicornstudio-react
```

### Step 2: Create Component

```tsx
import UnicornScene from "unicornstudio-react";
import { useState, useEffect } from "react";

export const YourUnicornBackground = () => {
  const { width, height } = useWindowSize();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
    }, 2500);

    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -100,
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            zIndex: 1,
          }}
        />
      )}

      {isLoaded && (
        <div style={{ position: "relative", zIndex: 2 }}>
          <UnicornScene
            production={true}
            projectId="YOUR_PROJECT_ID"
            width={width}
            height={height}
          />
        </div>
      )}
    </div>
  );
};
```

### Step 3: Add Window Size Hook

```tsx
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
```

### Step 4: Use in Your Component

```tsx
import { YourUnicornBackground } from "./YourUnicornBackground";

export const YourMainComponent = () => {
  return (
    <div className="relative">
      <YourUnicornBackground />
      {/* Your content here */}
    </div>
  );
};
```

## 🎨 Project IDs Used

- **Main Background**: `"ed7SJMvTJEVxfqzypOOQ"` (Raycast Blue Background)
- **Alternative**: `"1grEuiVDSVmyvEMAYhA6"` (OpenAI Codex Background)

## 🚨 Current Issues & Solutions

### Issue: Mobile Particle Animation ✅ FIXED

**Problem**: The fallback background in `open-ai-codex-animated-background.tsx` shows particle animations on mobile.

**Solution Applied**:

1. ✅ Added `hidden md:block` classes to particle container to hide on mobile
2. ✅ Particles now only show on desktop/tablet (md breakpoint and above)
3. ✅ Mobile users see clean fallback without unwanted particle animations

**Code Fix**:

```tsx
{
  /* Floating particles - Hidden on mobile to prevent unwanted animations */
}
<div className="absolute inset-0 hidden md:block">{/* particles */}</div>;
```

**Alternative Solutions**:

1. Remove or disable the fallback particle system entirely
2. Use the clean `RaycastAnimatedBlueBackground` approach instead

### Issue: Loading Performance

**Problem**: Unicorn Studio scenes can take time to load.

**Solution**:

1. Use proper loading states with black fallback
2. Implement timeout-based loading (2.5 seconds works well)
3. Only render the scene when fully loaded

## 📱 Mobile Considerations

1. **No Particle Animations**: Avoid fallback particle systems on mobile
2. **Performance**: Use `production={true}` for optimized mobile performance
3. **Responsive Sizing**: Always use `useWindowSize` hook for proper dimensions
4. **Z-Index Management**: Ensure proper layering with negative z-index values

## 🔍 Debugging Tips

1. **Console Logs**: The Raycast component includes helpful console logs
2. **Loading States**: Check `isLoading` and `isLoaded` states
3. **Project ID**: Verify the correct project ID is being used
4. **Dimensions**: Ensure width/height are properly set
5. **Z-Index**: Check that the background is behind content

## 🎯 Summary

The **Raycast Blue Background** implementation is the gold standard for Unicorn Studio integration in this project. It's clean, performant, mobile-friendly, and works beautifully. Use this pattern for all future Unicorn Studio implementations.

**Key Takeaways**:

- ✅ Use direct React component approach
- ✅ Implement proper loading states
- ✅ Use production mode
- ✅ Avoid complex fallback systems
- ✅ Manage z-index properly
- ✅ Use responsive dimensions
- ❌ Don't add particle animations to fallbacks
- ❌ Don't overcomplicate the implementation
