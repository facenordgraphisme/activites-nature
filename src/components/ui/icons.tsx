export function FacebookIcon({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.7h2.6l.4-3h-3v-1.93c0-.87.24-1.46 1.5-1.46h1.6V4.2c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.42-3.9 4.02v2.2H7.75v3h2.61V21h3.14Z" />
    </svg>
  );
}
