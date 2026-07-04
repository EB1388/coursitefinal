export function AppStoreBadge({ href }: { href?: string }) {
  const badge = (
    <svg viewBox="0 0 120 40" className="h-10 w-auto" aria-label="Download on the App Store">
      <rect width="120" height="40" rx="8" fill="#000" stroke="#fff" strokeOpacity="0.25" />
      <text x="42" y="14" fill="#fff" fontSize="7" fontFamily="system-ui">
        Download on the
      </text>
      <text x="42" y="28" fill="#fff" fontSize="13" fontFamily="system-ui" fontWeight="600">
        App Store
      </text>
      <path
        fill="#fff"
        d="M18 28c0-4.2 2.5-6.3 2.5-6.3s-1.2-1.8-1.2-4.4c0-3.4 2-5.6 2-5.6s2.2 2.2 2.2 5.4c0 2.6-1.2 4.5-1.2 4.5S26 23.8 26 28H18z"
      />
    </svg>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block transition-transform duration-160 active:scale-[0.97]">
        {badge}
      </a>
    );
  }

  return <div className="inline-block opacity-50">{badge}</div>;
}
