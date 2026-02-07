function Logo({ size = 32, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dome / bell curve */}
      <path
        d="M12 38 C12 38, 10 14, 32 10 C54 6, 54 34, 54 38"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left tentacle - J shape curling left */}
      <path
        d="M20 38 C20 38, 20 54, 14 58 C8 62, 4 56, 6 52"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Middle tentacle - longest straight line */}
      <line
        x1="34"
        y1="38"
        x2="34"
        y2="54"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Right tentacle - shortest */}
      <line
        x1="46"
        y1="38"
        x2="46"
        y2="48"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Logo;
