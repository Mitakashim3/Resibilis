'use client';

import { useEffect, useRef } from 'react';

// Only load real AdSense ads in production builds.
// (AdSense typically won't serve on localhost and can throw errors in dev.)
const ADS_ENABLED = process.env.NODE_ENV === 'production';

// Prefer env var, fallback to current ID
const ADSENSE_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? 'ca-pub-8782757148864843';

type AdSize = 'banner' | 'rectangle' | 'leaderboard' | 'responsive';

interface AdBannerProps {
  slot: string; // Your ad unit slot ID from AdSense
  size?: AdSize;
  className?: string;
}

const adSizeConfig: Record<AdSize, { width: number; height: number } | 'responsive'> = {
  banner: { width: 468, height: 60 },
  rectangle: { width: 300, height: 250 },
  leaderboard: { width: 728, height: 90 },
  responsive: 'responsive',
};

export function AdBanner({ slot, size = 'responsive', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!ADS_ENABLED || isLoaded.current) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 30;

    const tryLoad = () => {
      if (cancelled || isLoaded.current) return;

      const containerWidth = adRef.current?.getBoundingClientRect().width ?? 0;

      // Prevent: "No slot size for availableWidth=0"
      if (containerWidth < 50) {
        attempts += 1;
        if (attempts <= maxAttempts) {
          requestAnimationFrame(tryLoad);
        }
        return;
      }

      try {
        // Queue ad rendering; AdSense script will process pushes when ready
        const win = window as unknown as { adsbygoogle?: unknown[] };
        win.adsbygoogle = win.adsbygoogle || [];
        win.adsbygoogle.push({});
        isLoaded.current = true;
      } catch (error) {
        console.error('AdSense error:', error);
      }
    };

    // Wait at least one frame so layout has a measurable width
    requestAnimationFrame(tryLoad);

    return () => {
      cancelled = true;
    };
  }, []);

  // Don't render anything if ads are disabled
  if (!ADS_ENABLED) {
    return null;
  }

  const sizeConfig = adSizeConfig[size];
  const isResponsive = sizeConfig === 'responsive';

  return (
    <div 
      ref={adRef}
      className={`ad-container w-full overflow-hidden flex justify-center ${isResponsive ? 'min-h-24' : ''} ${className}`}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...(isResponsive
            ? { width: '100%' }
            : {
                width: `${sizeConfig.width}px`,
                height: `${sizeConfig.height}px`,
              }),
        }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        {...(isResponsive && {
          'data-ad-format': 'auto',
          'data-full-width-responsive': 'true',
        })}
      />
    </div>
  );
}

// Placeholder component for development/preview
export function AdPlaceholder({ 
  size = 'responsive', 
  className = '' 
}: { 
  size?: AdSize; 
  className?: string;
}) {
  const sizeConfig = adSizeConfig[size];
  const isResponsive = sizeConfig === 'responsive';

  return (
    <div
      className={`
        flex items-center justify-center
        bg-gray-100 dark:bg-gray-800
        border-2 border-dashed border-gray-300 dark:border-gray-600
        rounded-lg text-gray-500 dark:text-gray-400
        text-sm font-medium
        ${isResponsive ? 'w-full h-24' : ''}
        ${className}
      `}
      style={
        !isResponsive
          ? {
              width: `${sizeConfig.width}px`,
              height: `${sizeConfig.height}px`,
            }
          : undefined
      }
    >
      <div className="text-center">
        <p>📢 Ad Space</p>
        <p className="text-xs opacity-70">
          {isResponsive ? 'Responsive' : `${sizeConfig.width}×${sizeConfig.height}`}
        </p>
      </div>
    </div>
  );
}

// Combined component that shows placeholder in dev, real ads in production
export function Ad({ 
  slot, 
  size = 'responsive', 
  className = '',
  showPlaceholder = true 
}: AdBannerProps & { showPlaceholder?: boolean }) {
  const hasValidSlot = !!slot && slot !== 'YOUR_AD_SLOT_ID';

  // In dev (or when slot isn't configured), show a placeholder instead of throwing AdSense errors.
  if (!ADS_ENABLED || !hasValidSlot) {
    return showPlaceholder ? <AdPlaceholder size={size} className={className} /> : null;
  }

  return <AdBanner slot={slot} size={size} className={className} />;
}
