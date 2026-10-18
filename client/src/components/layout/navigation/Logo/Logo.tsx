// Portfolio mark, from the Figma Navigation Rail "Logo". Colors are theme
// tokens, so it follows Light/Dark.
export default function Logo({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        width="56"
        height="56"
        rx="10.08"
        fill="var(--md-sys-color-primary-container)"
      />
      <g
        stroke="var(--md-sys-color-on-primary-container)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12.32 43.68V12.32" />
        <path d="M12.32 12.32L43.68 43.68" />
        <path d="M43.68 43.68V12.32" />
      </g>
      <g fill="var(--md-sys-color-on-primary-container)">
        <circle cx="12.32" cy="43.68" r="3.92" />
        <circle cx="12.32" cy="12.32" r="3.92" />
        <circle cx="43.68" cy="12.32" r="3.92" />
      </g>
      <circle
        cx="43.68"
        cy="43.68"
        r="3.92"
        fill="var(--md-sys-color-tertiary)"
      />
    </svg>
  );
}
