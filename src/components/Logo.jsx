function Logo({ size = 32, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hemisphere dome connected to J-shape on the left.
          Arc goes from bottom-left, up over a semicircle, 
          ending partway down the right side (not a full tangent). */}
      <path
        d="M16 40 C16 18, 48 18, 48 32"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* J-shape: continues from left end of dome, straight down then curls left */}
      <path
        d="M16 40 L16 52 C16 60, 6 60, 6 54"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Middle tentacle - straight vertical, longest */}
      <line
        x1="32"
        y1="40"
        x2="32"
        y2="56"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Right dot - aligned with right edge of dome, detached */}
      <circle
        cx="48"
        cy="46"
        r="4"
        fill={color}
      />
    </svg>
  );
}

export default Logo;
