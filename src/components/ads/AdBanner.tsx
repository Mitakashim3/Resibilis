'use client';

import { useEffect, useRef } from 'react';

// Set to true when you have your AdSense account approved
const ADS_ENABLED = true;

// Replace with your actual AdSense publisher ID (format: ca-pub-XXXXXXXXXXXXXXXX)
const ADSENSE_PUBLISHER_ID = 'ca-pub-8782757148864843';

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

    try {
      // Queue ad rendering; AdSense script will process pushes when ready
      const win = window as unknown as { adsbygoogle?: unknown[] };
      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
      isLoaded.current = true;
    } catch (error) {
      console.error('AdSense error:', error);
    }
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
            ? {}
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
  if (!ADS_ENABLED) {
    return showPlaceholder ? <AdPlaceholder size={size} className={className} /> : null;
  }

  return <AdBanner slot={slot} size={size} className={className} />;
}
