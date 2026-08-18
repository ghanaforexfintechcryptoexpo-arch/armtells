import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Fuel } from 'lucide-react';
import { resolveFleetImage, DEFAULT_ONLINE_FALLBACK_IMAGE, DEFAULT_FLEET_FALLBACK_IMAGE } from '../../constants/fleetImages';

export interface FleetImageProps {
  id?: string;
  src?: string;
  alt: string;
  tankerId?: string;
  makeModel?: string;
  className?: string;
  fallbackSrc?: string;
  aspectRatio?: string;
  showBadge?: boolean;
}

export const FleetImage: React.FC<FleetImageProps> = ({
  id,
  src,
  alt,
  tankerId,
  makeModel,
  className = 'w-full h-full object-cover',
  fallbackSrc,
  showBadge = false
}) => {
  const resolved = resolveFleetImage(tankerId || makeModel, src);
  const initialSource = resolved.imageUrl || DEFAULT_FLEET_FALLBACK_IMAGE;
  const secondarySource = fallbackSrc || resolved.fallbackImageUrl || DEFAULT_ONLINE_FALLBACK_IMAGE;

  const [currentSrc, setCurrentSrc] = useState<string>(initialSource);
  const [hasFailedPrimary, setHasFailedPrimary] = useState<boolean>(false);
  const [hasFailedAll, setHasFailedAll] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Sync state if source prop changes
  useEffect(() => {
    const nextResolved = resolveFleetImage(tankerId || makeModel, src);
    setCurrentSrc(nextResolved.imageUrl);
    setHasFailedPrimary(false);
    setHasFailedAll(false);
    setIsLoaded(false);
  }, [src, tankerId, makeModel]);

  const handleError = () => {
    if (!hasFailedPrimary && secondarySource && currentSrc !== secondarySource) {
      setHasFailedPrimary(true);
      setCurrentSrc(secondarySource);
    } else {
      setHasFailedAll(true);
    }
  };

  // If both local and remote assets fail, render a crisp, branded vector placeholder (never broken image)
  if (hasFailedAll) {
    return (
      <div 
        id={id ? `${id}-fallback-vector` : undefined}
        className="w-full h-full bg-gradient-to-br from-[#121214] via-[#0A0A0B] to-[#18181B] border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FF6B00 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="w-12 h-12 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center mb-2 shadow-lg">
          <Truck className="w-6 h-6 text-[#FF6B00]" />
        </div>
        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider text-center">
          {makeModel || tankerId || 'Armtells Tanker'}
        </span>
        <span className="text-[10px] font-mono text-slate-400 mt-1 flex items-center gap-1">
          <Fuel className="w-3 h-3 text-amber-400" /> Class 3 Petroleum Hauler
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0A0A0B]">
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#0F0F11] animate-pulse flex items-center justify-center">
          <Truck className="w-8 h-8 text-white/20" />
        </div>
      )}

      <img
        id={id}
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {showBadge && (
        <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-sm border border-white/15 px-2 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>GSA Inspected</span>
        </div>
      )}
    </div>
  );
};
