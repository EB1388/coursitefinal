"use client";

export function PremiumAmbient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="mesh-hero absolute inset-0" />
      <div
        className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
